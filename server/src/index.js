require('./setup')
const Module = require('core-server/Module')

const { join } = require('path')

const start = async () => {
  const app = new Module({
    name: 'app',
    node_modules: join(__dirname, '../node_modules'),
    path: join(__dirname, './app'),
    bundles: [
      'core-server',
      'mongo',
      'management-server',
      'storage-server',
      'modeling-server',
      'processing-server',
    ]
  })

  app.load()
  await app.process()
  await app.object.onReady.trigger({
    setup: true
  })
}

start().catch((err) => {
  if (err.detail) {
    console.error(JSON.stringify(err.detail, null, ' '))
  } else {
    console.error(err)
  }
  process.exit()
})
