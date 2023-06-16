const models = require('shared/models')
const axios = require('axios')

class Collection {
  constructor(values) {
    Object.assign(this, values)
    this.instances = []
  }

  hold(model) {
    if (this.autoHold) {
      model.hold(this)
      this.instances.push(model)
    }
  }

  releaseAll() {
    this.instances.forEach((instance) => instance.release(this))
    this.instances = []
  }

  async request(action, ...args) {
    //console.log(`Requesting /api${action}`, body)
    const url = `${this.url}/api/${this.type.definition.pluralName}${action}`
    //console.log(action, ...args)
    try {
      const response = await axios({
        url,
        method: 'POST',
        //mode: 'no-cors',
        data: args,
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      const result = response.data
      return result
    } catch (err) {
      throw new Error(`API error: ${err.message}`,)
    }
  }

  async findOne(query, options) {
    const [result] = await this.find(query, {
      ...options,
      limit: 1,
    })

    return result
  }

  async find(query, options) {
    const modelsJson = await this.request('/find', query, options)
    const models = modelsJson.map((modelJson) => {
      const model = this.type.parse(modelJson)
      model.setLoadState(options.load || {})
      this.hold(model)
      return model
    })
    return models
  }

  async createOrUpdate(...args) {
    let modelJson
    let query
    if (args.length === 2) {
      [query, modelJson] = args
    } else {
      const [model] = args
      const index = model.getFirstUniqueIndex()
      if (!index) {
        //console.log(model, model.toJSON())
        throw new Error()
      }
      modelJson = model
      query = [index]
    }
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const json = await this.request('/create-or-update', query, modelJson)
    const resultModel = this.type.parse(json)
    this.hold(resultModel)
    return resultModel
  }
}

const getCollections = (url, options = {}) => {
  const collections = [models.Entity, models.Organization].reduce((acc, type) => {
    const collection = new Collection({ type, url, ...options })
    acc[type.definition.pluralName] = collection
    type.collection = collection
    console.log({ type, collection })
    return acc
  }, {})
  return collections
}

module.exports = {
  getCollections
}



