const axios = require('axios')
const context = require('core-client/context')
const Models = require('./Models')

const getArgs = (args) => {
  return args.filter((arg) => arg !== context)
}

module.exports = class Collection {
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

  async request(options) {
    try {
      let headers = options.headers
      if (this.headersBuilder) {
        const additionalHeaders = await this.headersBuilder()
        Object.assign(headers, additionalHeaders)
      }
      const response = await axios({
        ...options,
        method: 'POST',
        withCredentials: true,
        headers
      })
      const result = response.data
      //console.log(action, ...args, result)
      return result
    } catch (err) {
      throw new Error(`API error: ${err.message}`,)
    }
  }

  async apiRequest(action, body, options = {}) {
    const url = `${this.url}/api/collections/${this.type.definition.pluralName}${action}`
    console.log(action, body, options)

    const result = await this.request({
      url,
      data: body,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return result
  }

  async findOne(...args) {
    const [query, options] = getArgs(args)
    const [result] = await this.find(query, {
      ...options,
      limit: 1,
    })

    return result
  }

  async find(...args) {

    const [query, options = {}] = getArgs(args)
    const modelsJson = await this.apiRequest('/find', { query, options })
    const modelsArray = modelsJson.map((modelJson) => {

      const model = this.type.parse(modelJson)
      model.setLoadState(options.load || {})
      this.hold(model)
      return model
    })
    const models = new (Models.of(this.type))(modelsArray, { query, options })
    return models
  }

  async create(modelJson, options = {}) {
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const json = await this.apiRequest('/create', modelJson, options)
    const resultModel = this.type.parse(json)
    resultModel.setLoadState(true)
    this.hold(resultModel)
    await this.onModelUpdated(resultModel)
    return resultModel
  }

  async onModelUpdated(model) {
    for (const instance of Models.instances) {
      await instance.onModelUpdated(model)
    }
  }

  async update(query, patches) {
    const json = await this.apiRequest('/update', { query, patches })
    const resultModel = this.type.parse(json)
    this.hold(resultModel)
    return resultModel
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
        console.log(JSON.stringify(model.toJSON(), null, ' '))
        throw new Error()
      }

      modelJson = model
      query = [index]
    }
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const json = await this.apiRequest('/create-or-update', { query, modelJson })
    console.log('create-or-update', json)
    const resultModel = this.type.parse(json)
    resultModel.setLoadState(true)
    this.hold(resultModel)
    return resultModel
  }
}
