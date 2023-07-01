require('./setup')
const Module = require('core-server/Module')
const { join } = require('path')

const process = async () => {
  const app = new Module({
    name: 'app',
    path: join(__dirname, './app'),
  })

  app.load()
  console.log('processing')
  await app.process()
  await app.object.onReady.trigger()
}

process().catch((err) => {
  throw err
})
