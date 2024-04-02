const MongoScope = require('./MongoScope')
const { nanoid } = require('nanoid')
const { chain } = require('core/utils/array')
const mixer = require('core/mixer')
const handlers = require('./handlers')
const { processStages } = require('./queryUtils')
const { get } = require('core/utils/path')
const { validate } = require('./utils')
const { Array } = require('modeling/types')
const QueryResult = require('modeling/types/QueryResult')

const patchesMap = {
  '$set': (object, value) => {
    Object.assign(object, value)
  }
}

const applyPatches = (object, pathes) => {
  Object.entries(pathes)
    .forEach(([k, v]) => {
      patchesMap[k](object, v)
    })
}

const DELETE_MANY_SIZE = 100

module.exports = class MongoCollection {

  static methods = [
    'findOne',
    'find',
    'query',
    'create',
    'update',
    'createOrUpdate',
    'delete',
    'deleteMany'
  ]

  constructor(type, db, controllers) {
    this.type = type
    this.db = db
    this.name = type.definition.pluralName
    this.type.collection = this
    this.mongoCollection = this.db.collection(type.definition.pluralName)
    this.controllers = controllers
  }


  async exists() {
    const collections = await this.db.listCollections().toArray()
    const exist = collections.some(c => c.name === this.name)
    return exist
  }

  async build() {
    if (!await this.exists()) {
      await this.db.createCollection(this.name)
    }

    const indexes = await this.mongoCollection.listIndexes().toArray()
    const types = this.type.getAllChilds()
    for (const type of types) {
      for (const index of type.indexes) {
        if (index.build === false || index.owner !== type) { continue }
        const properties = index.properties.reduce((acc, property) => {
          acc[property] = 1
          return acc
        }, {})
        const options = {
          name: index.name,
          unique: index.unique,
        }
        const hasIndex = indexes.some((i) => i.name === index.name)
        if (hasIndex) {
          await this.mongoCollection.dropIndex(index.name)
        }
        if (type !== this.type) {
          const childTypes = type
            .getAllChilds()
            .filter((t) => !t.definition.abstract)
          options.partialFilterExpression = {
            '@type': {
              $in: childTypes.map((t) => t.definition.name)
            }
          }
        }
        await this.mongoCollection.createIndex(properties, options)
      }
    }

  }

  getTypeControllers(type) {
    const controllers = this.controllers
      .filter((controller) => {
        return type === controller.type || mixer.is(type.prototype, controller.type)
      })
      .map((c) => c.controller)

    return controllers
  }

  async findOne(req, filter, options) {
    const [result] = await this.find(req, filter, {
      ...options,
      limit: 1,
    })

    return result
  }

  async queryController(req, type, stages, detail) {
    const controllers = this.getTypeControllers(type)
    for (const controller of controllers) {
      if (controller.query) {
        const result = await controller.query(req, stages, detail)
        if (result) {
          stages = result
        }
      }
    }

    return stages
  }

  async find(req, filter = [], options) {
    return this.query(req, [{
      filter
    }], options)
  }


  async query(req, stages = [], options = {}) {

    let type = this.type
    if (options.type) {
      type = this.type.findChild((c) => c.definition.name === options.type)
      if (type !== this.type) {
        stages.unshift({
          filter: [{
            $is: ['$this', type.definition.name]
          }]
        })
      }
    }

    if (!type) {
      throw new Error('Type not found')
    }
    stages = await this.queryController(req, type, stages)
    //console.log(JSON.stringify(stages, null, ' '))

    const rootScope = new MongoScope({
      req,
      handlers,
      collection: this,
    })

    rootScope.variables = {
      this: {
        sourceType: 'var',
        name: 'this',
        value: '$$CURRENT',
        type: type,
      }
    }

    const pipeline = await processStages(rootScope, stages, options)
    //console.log(JSON.stringify(pipeline, null, ' '))


    const modelsJson = await this.mongoCollection
      .aggregate(pipeline)
      .toArray()

    /*
    console.log(JSON.stringify({ modelsJson }, null, ' '))
    process.exit()
    /**/


    const models = new (QueryResult.of(type))(modelsJson.map((m) => {
      const model = type.parse(m)
      model.setLoadState(options.load || {})
      return model
    }), { stages, options })

    return models
  }

  async create(req, modelJson) {
    let model
    if (modelJson instanceof this.type) {
      model = modelJson
    } else {
      model = this.type.parse(modelJson)
    }
    console.log('create', model.toJSON())
    model._id = nanoid()
    if (!await model.constructor.canCreate(req)) {
      throw new Error(`Cannot create ${model.constructor.definition.name}`)
    }
    await validate(req, model.constructor, false, model)
    const controllers = this.getTypeControllers(model.constructor)
    await chain(controllers, async (controller, next) => {
      if (!controller.create) {
        return next()
      }
      return controller.create(req, model, next)
    }, async () => {
      const json = model.toJSON()
      await this.mongoCollection.insertOne(json)
    })

    return model
  }

  async innerUpdate(req, model, patches) {
    const editJson = model.toJSON()
    applyPatches(editJson, patches)
    const editModel = this.type.parse(editJson)
    if (editModel.constructor !== model.constructor) {
      throw new Error('Type not matching')
    }
    await validate(req, model.constructor, true, editModel, model)
    const controllers = this.getTypeControllers(model.constructor)
    await chain(controllers, async (controller, next) => {
      if (!controller.update) {
        return next()
      }
      return controller.update(req, editModel, model, next)
    }, async () => {
      const json = editModel.toJSON()
      delete json._id
      await this.mongoCollection.updateOne({
        _id: model._id,
      }, {
        $set: json
      })
    })

    return editModel
  }


  async update(req, query, patches) {
    const model = await this.findOne(req, query, { limit: 1 })
    if (!model) {
      throw new Error()
    }
    console.log('update', model.toJSON())
    const result = await this.innerUpdate(req, model, patches)
    return result
  }

  async createOrUpdate(req, query, modelJson) {
    const type = modelJson['@type']
    if (!type) {
      throw new Error()
    }
    const [existingModel] = await this.find(req, query, { limit: 1, type })
    if (existingModel) {
      console.log('doing update')
      const result = await this.innerUpdate(req, existingModel, {
        $set: modelJson
      })
      return result
    } else {
      console.log('doing created')
      const result = await this.create(req, modelJson)
      return result
    }
  }

  async delete(req, arg) {
    let model
    if (typeof arg === 'string') {
      model = await this.findOne(req, { _id: arg })
    } else {
      model = arg
    }

    if (!model || !(model instanceof this.type)) {
      throw new Error(`Model with id ${_id} not found`)
    }
    const controllers = this.getTypeControllers(model.constructor)
    await chain(controllers, async (controller, next) => {
      if (!controller.delete) {
        return next()
      }
      return controller.delete(req, model, next)
    }, async () => {
      await this.mongoCollection.deleteOne({
        _id,
      })
    })
  }

  async deleteMany(req, query) {
    let models
    do {
      models = await this.find(req, query, {
        limit: DELETE_MANY_SIZE
      })
      for (const model of models) {
        await this.delete(req, model)
      }
    } while (models.length === DELETE_MANY_SIZE)
  }

  async purge() {
    await this.mongoCollection.deleteMany({})
  }
}
