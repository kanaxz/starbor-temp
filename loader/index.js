
const config = require('./config')
const mongo = require('mongodb')

const loadersNames = [
  'locations',
  'starmap',
  //'starcitizen',
]

const start = async () => {
  const client = await mongo.MongoClient.connect(config.mongo.url, {
    useUnifiedTopology: true
  })
  const db = client.db(config.mongo.db)

  const services = {
    db,
  }
  for (const loaderName of loadersNames) {
    const loader = require(`./loaders/${loaderName}`)
    await loader(services)
  }
  console.log('closing')
  client.close()
}

start()