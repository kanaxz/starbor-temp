const MongoScope = require('./MongoScope')
const { nanoid } = require('nanoid')
const { chain } = require('core/utils/array')
const mixer = require('core/mixer')
const handlers = require('./handlers')
const { processQuery, makePath } = require('./queryUtils')
const { get } = require('core/utils/path')
const { validate } = require('./utils')

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

const collect = (models, path) => {
  const array = models
    .flatMap((model) => {
      const array = get(model, path)
      return Array.isArray(array) ? [...array] : [array]
    })
    .filter((o) => o)

  return array
}

const applyLookups = async (models, lookups, paths, path) => {
  for (const [propertyName, subPaths] of Object.entries(paths)) {
    const lookup = lookups.find(({ property }) => property.name === propertyName)
    if (!lookup) {
      throw new Error(`Lookup not found for property ${propertyName}`)
    }

    const currentPath = makePath(path, propertyName)
    await applyLookups(models, lookup.lookups, subPaths, currentPath)

    const subModels = collect(models, currentPath)
    lookup.controllers.tip.resolve(subModels)
    await lookup.controllers.rightToLeft
  }
}

const DELETE_MANY_SIZE = 100

module.exports = class MongoCollection {
  constructor(type, mongodb, controllers) {
    this.type = type
    this.mongodb = mongodb
    this.type.collection = this
    this.mongoCollection = mongodb.collection(type.definition.pluralName)
    this.controllers = controllers
  }

  async build() {
    const name = this.type.definition.pluralName
    const collections = await this.mongodb.listCollections().toArray()
    const exist = collections.some(c => c.name === name)
    if (!exist) {
      await this.mongodb.createCollection(name)
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

  async findOne(req, query, options) {
    const [result] = await this.find(req, query, {
      ...options,
      limit: 1,
    })

    return result
  }

  async find(req, query = [], options = {}) {
    let type = this.type
    if (options.type) {
      type = this.type.findChild((c) => c.definition.name === options.type)
      if (type !== this.type) {
        query.push({
          $is: ['$this', type.definition.name]
        })
      }
    }

    if (!type) {
      throw new Error('Type not found')
    }

    const initPipeline = []
    let models
    const controllers = this.getTypeControllers(type)
    await chain(controllers, async (controller, next) => {
      if (!controller.find) {
        return next()
      }
      return controller.find(req, initPipeline, query, (newQuery) => {
        if (newQuery) {
          query = newQuery
        }
        return next()
      })
    }, async () => {
      const rootScope = new MongoScope({
        req,
        handlers,
        collection: this,
      })
      const { pipeline, lookups } = await processQuery(rootScope, type, query, options)
      pipeline.unshift(...initPipeline)
      console.log(JSON.stringify(pipeline, null, ' '))

      const modelsJson = await this.mongoCollection
        .aggregate(pipeline)
        .toArray()
      /*
      console.log(JSON.stringify({ modelsJson }, null, ' '))
      process.exit()
      /**/


      models = modelsJson.map((m) => {
        const model = type.parse(m)
        model.setLoadState(options.load)
        return model
      })
      await applyLookups(models, lookups, options.load)
      return models
    })

    return models
  }

  async create(req, modelJson) {
    let model
    if (modelJson instanceof this.type) {
      model = modelJson
    } else {
      model = this.type.parse(modelJson)
    }
    model._id = nanoid()
    await validate(req, model.constructor, 'create', model)
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
    await validate(req, model.constructor, 'update', editModel, model)
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
    const [model] = await this.find(req, query, { limit: 1 })
    if (!model) {
      throw new Error()
    }
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
      const result = await this.innerUpdate(req, existingModel, {
        $set: modelJson
      })
      return result
    } else {
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
}
