const mongo = require('mongodb')
const MongoCollection = require('./MongoCollection')
const { Model } = require('modeling/types')

module.exports = {
  name: 'mongo',
  dependencies: ['modeling'],
  async construct({ modeling }, config) {
    const client = await mongo.MongoClient.connect(config.mongo.url)

    const db = client.db(config.mongo.db)

    modeling.map.push([
      Model, (type, controllers) => new MongoCollection(type, db, controllers),
    ])


    return {
      client,
      db,
    }
  }
}