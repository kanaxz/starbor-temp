const { buildPipeline, buildLookups, unloadLookup } = require('./utils')
const Scope = require('./Scope')
const { nanoid } = require('nanoid')

const objectDiff = (paths1, paths2) => {
  return Object.entries(paths1)
    .reduce((acc, [propertyName, value1]) => {
      let value2 = paths2[propertyName]
      if (!value2) {
        acc[propertyName] = true
      } else {
        if (value2 === true) {
          value2 = {}
        }
        if (value1 === true) {
          value1 = {}
        }
        const subDiff = objectDiff(value1, value2)
        if (Object.keys(subDiff).length) {
          acc[propertyName] = subDiff
        }
      }
      return acc
    }, {})
}


const merge = (load1, load2) => {
  const unload = objectDiff(load1, load2)
  const load = objectDiff(load2, load1)
  return { load, unload }
}


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

module.exports = class Collection {
  constructor(mongodb, type) {
    this.mongodb = mongodb
    this.mongoCollection = mongodb.collection(type.definition.pluralName)
    this.type = type
  }

  async find(req, query, options = {}) {
    let type = this.type
    if (options.type) {
      type = this.type.findChild((c) => c.definition.name === options.type)
    }
    console.log('find', type.definition.name)
    if (!type) {
      throw new Error('Type not found')
    }
    const scope = new Scope()
    scope.variables.this = {
      sourceType: 'var',
      name: 'this',
      value: '$$CURRENT',
      type: type,
    }
    const pipeline = buildPipeline(scope, query)
    if (!options.load) {
      options.load = {}
    }
    const { load, unload } = merge(scope.paths, options.load)
    pipeline.push(
      {
        $limit: Math.min(options.limit || 50)
      },
      ...unloadLookup(type, unload),
      ...buildLookups(type, load),
    )

    console.log('load', load)

    //console.log(JSON.stringify(pipeline, null, ' '))

    const models = await this.mongoCollection
      .aggregate(pipeline)
      .toArray()
      /*
    if (Object.keys(options.load).length) {
      console.log(JSON.stringify({ models }, null, ' '))
      process.exit()
    }
    */

    return models.map((m) => type.parse(m))
  }

  async create(req, modelJson) {
    modelJson._id = nanoid()
    const model = this.type.parse(modelJson)
    const json = model.toJSON()
    await this.mongoCollection.insertOne(json)
    return model
  }

  async innerUpdate(req, model, patches) {
    const modelJson = model.toJSON()
    const editModel = new model.constructor(modelJson)
    applyPatches(editModel, patches)
    await this.mongoCollection.updateOne({
      _id: model._id,
    }, {
      $set: editModel.toJSON()
    })
    return editModel
  }


  async update(req, query, patches) {
    const [model] = await this.find(query, { limit: 1 })
    if (!model) {
      throw new Error()
    }
    const result = await this.innerUpdate(req, model, patches)
    return result
  }

  async createOrUpdate(req, query, modelJson) {
    const [existingModel] = await this.find(req, query, { limit: 1 })
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
}
