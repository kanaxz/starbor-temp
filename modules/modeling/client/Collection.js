const axios = require('axios')
const context = require('core-client/context')
const QueryResult = require('modeling/types/QueryResult')
const Models = require('modeling/types/Models')
const mixer = require('core/mixer')
const Bindeable = require('core/mixins/Bindeable')
const { objectToFilter } = require('modeling/processing/utils')


const getArgs = (args) => {
  return args.filter((arg) => arg !== context)
}


module.exports = class Collection extends mixer.extends([Bindeable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
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
        ...this.axiosOptions,
        method: 'POST',
        withCredentials: true,
        headers,
      })
      const result = response.data
      //console.log(action, ...args, result)
      return result
    } catch (err) {
      if (err.cause) {
        console.error(err.cause)
        throw err
      }
      if (err.response) {
        throw new Error(`API error on url ${options.url}: ${JSON.stringify(err.response.data, null, ' ')} `,)
      }
      throw err
    }
  }

  async apiRequest(action, body, options = {}) {
    const url = `${this.url}/api/collections/${this.type.definition.pluralName}${action}`
    //console.log(action, JSON.stringify(body, null, ' '), JSON.stringify(options, null, ' '))

    const { result } = await this.request({
      url,
      data: body,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return result
  }

  async findByUniqueIndex(index, options) {
    const model = this.instances.find((m) => m.anyUniqueIndexMatch(index))
    if (model) { return model }

    return this.findOne(objectToFilter(index), options)
  }

  async findOne(...args) {
    const [filter, options] = getArgs(args)
    const [result] = await this.find(filter, {
      ...options,
      limit: 1,
    })

    return result
  }

  async find(...args) {
    const [filter, options] = getArgs(args)
    const result = await this.query([{
      filter
    }], options)

    return result
  }

  async query(...args) {
    const [stages, options = {}] = getArgs(args)
    const modelsJson = await this.apiRequest('/query', [stages, options])
    const modelsArray = modelsJson.map((modelJson) => {
      const model = this.type.parse(modelJson, { singleInstance: true })
      model.setLoadState(options.load || {})
      return model
    })
    const models = new (QueryResult.of(this.type))(modelsArray, { stages, options })
    return models
  }

  async create(modelJson) {
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const json = await this.apiRequest('/create', [modelJson])
    const instance = this.type.parse(json, { singleInstance: true })
    instance.setLoadState(true)
    await this.onModelCreated(instance)
    return instance
  }

  async findOrCreate(modelJson) {
    if (modelJson.toJSON) {
      modelJson = modelJson.toJSON()
    }
    const { created, model } = await this.apiRequest('/findOrCreate', [modelJson])
    const instance = this.type.parse(model, { singleInstance: true })
    instance.setLoadState(true)
    if (created) {
      await this.onModelCreated(instance)
    }
    return instance
  }

  async onModelCreated(model) {
    for (const ref of Models.references) {
      if (ref.onModelCreated) {
        await ref.onModelCreated(model)
      }
    }
  }

  async onModelUpdated(model) {
    for (const ref of Models.references) {
      await ref.onModelUpdated(model)
    }
  }

  async update(query, patches) {
    const json = await this.apiRequest('/update', [query, patches])
    const instance = this.type.parse(json, { singleInstance: true })
    await this.onModelUpdated(instance)
    return instance
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
    const json = await this.apiRequest('/create-or-update', [query, modelJson])
    const resultModel = this.type.parse(json)
    resultModel.setLoadState(true)
    this.hold(resultModel)
    return resultModel
  }
}
