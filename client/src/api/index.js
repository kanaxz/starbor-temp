const config = require('@app/config')
const url = `${config.server.url}/api`
const models = require('@shared/models')


class Collection {
  constructor(modelClass) {
    this.modelClass = modelClass
  }

  async request(action, body) {
    console.log(`Requesting /api${action}`, body)
    const response = await fetch(`${url}/${this.modelClass.definition.pluralName}${action}`, {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const result = await response.json()
    //console.log(result)
    return result
  }

  async find(query, options) {
    const modelsJson = await this.request('/find', {
      query,
      options,
    })
    const models = modelsJson.map((modelJson) => {
      const model = this.modelClass.build(modelJson)
      console.log(model)
      model.setLoad(options.load)
      return model
    })
    return models
  }
}

const collections = [models.locations.Location].reduce((acc, modelClass) => {
  acc[modelClass.definition.pluralName] = new Collection(modelClass)
  return acc
}, {})

module.exports = {
  collections
}
