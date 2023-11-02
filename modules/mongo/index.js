const mongo = require('mongodb')
const MongoCollection = require('./MongoCollection')
const { Model } = require('modeling/types')

module.exports = {
  name: 'mongo',
  dependancies: ['processing', 'config'],
  async construct({ processing, config }) {
    const client = await mongo.MongoClient.connect(config.mongo.url)

    const db = client.db(config.mongo.db)

    processing.map.push([
      Model, (type, controllers) => new MongoCollection(type, db, controllers),
    ])

    return {
      client,
      db
    }
  }
}