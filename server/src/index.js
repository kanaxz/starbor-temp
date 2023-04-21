require('../../shared/core/modeling')
const Module = require('./core/Module')
const { join } = require('path')


const process = async () => {
  const app = new Module({
    name: 'app',
    path: join(__dirname, './app'),
  })

  app.load()
  console.log('processing')
  await app.process()
  app.object.onReady.trigger()
}

process().catch((err) => {
  throw err
})
