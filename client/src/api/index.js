const config = require('@app/config')
const url = `${config.server.url}/api`
const models = require('shared/models')


class Collection {
  constructor(type) {
    this.type = type
  }

  async request(action, body) {
    console.log(`Requesting /api${action}`, body)
    const response = await fetch(`${url}/${this.type.definition.pluralName}${action}`, {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log(response)
    if(response.status !== 200){
      throw new Error(response.statusText)
    }
    const result = await response.json()
    //console.log(result)
    return result
  }

  async find(query, options) {
    const modelsJson = await this.request('/find', {
      query,
      options,
    })
    console.log(modelsJson)
    const models = modelsJson.map((modelJson) => {
      const model = this.type.build(modelJson)
      model.setLoad(options.load || {})
      return model
    })
    return models
  }
}

const collections = [models.locations.Location].reduce((acc, type) => {
  const collection = new Collection(type)
  acc[type.definition.pluralName] = collection
  type.collection = collection
  return acc
}, {})

module.exports = {
  collections
}
