require('./setup')
const AppModule = require('core-server/AppModule')

const { join } = require('path')

const start = async () => {
  const app = new AppModule({
    name: 'app',
    node_modules: join(__dirname, '../node_modules'),
    path: join(__dirname, './app'),
    bundles: [
      'core-server',
      'mongo',
      'jwt-server',
      'management-server',
      'storage-server',
      'modeling-server',
      'processing-server',
    ]
  })

  await app.start()
 
}

start().catch((err) => {
  if (err.detail) {
    console.error(JSON.stringify(err.detail, null, ' '))
  } else {
    console.error(err)
  }
  process.exit()
})
