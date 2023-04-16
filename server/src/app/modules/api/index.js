const models = require('../../../../../shared/models')

class Collection {
  constructor(mongodb, modelClass) {
    this.mongodb = mongodb
    this.mongoCollection = mongodb.collection(modelClass.options.pluralName)
    this.modelClass = modelClass
  }
  find(match) {
    return this.mongoCollection.find(match)
  }
}

module.exports = {
  dependancies: ['express', 'mongo'],
  async construct({ express, mongo }) {
    const collections = [models.locations.Location].reduce((acc, modelClass) => {
      acc[modelClass.options.pluralName] = new Collection(mongo.db, modelClass)
      return acc
    }, {})



    const micros = await collections.locations.find({
      name: /micro/
    })
    console.log(micros)
  }
}