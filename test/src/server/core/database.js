const { MongoMemoryServer } = require('mongodb-memory-server')
const mongo = require('mongodb')
const MongoCollection = require('core-server/mongo/MongoCollection')
const Node = require('./Node')

const get = async (nodes) => {
  const mongod = await MongoMemoryServer.create()
  const client = await mongo.MongoClient.connect(mongod.getUri(), {
    useUnifiedTopology: true
  })

  const db = client.db('testing')
  const collection = new MongoCollection(Node, db, [])
  const nativeCollection = db.collection('nodes')
  if (nodes) {
    await nativeCollection.insertMany(nodes)
  }

  const stop = async () => {
    await client.close()
    await mongod.stop()
  }

  return {
    client,
    mongod,
    collection,
    db,
    nativeCollection,
    stop,
  }
}

module.exports = {
  get,
}