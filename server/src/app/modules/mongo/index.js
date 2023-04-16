const mongo = require('mongodb')
const config = require.main.require('./config')

module.exports = {
  async construct() {
    const client = await mongo.MongoClient.connect(config.mongo.url, {
      useUnifiedTopology: true
    })

    const db = client.database(config.mongo.db)

    return {
      client,
      db
    }
  }
}