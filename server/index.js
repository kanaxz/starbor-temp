require('./setup')
const CoreModule = require('core-server/CoreModule')
const config = require('./config')
const { join } = require('path')

const start = async () => {
  const core = new CoreModule({
    config,
    node_modules: join(__dirname, '/node_modules'),
    bundles: [
      'core-server',
      'migrations',
      'mongo',
      'management-server',
      'storage-server',
      'modeling-server',
      'starbor-server',
      'jwt-server',
    ]
  })

  await core.start()
  console.log('PURGE START')
  await core.object.trigger('purge')
  console.log('PURGE END')
  console.log('MIGRATE START')
  await core.object.trigger('migrate')
  console.log('MIGRATE END')
  return core
}

module.exports = start()
  .catch((err) => {
    if (err.detail) {
      console.error(JSON.stringify(err.detail, null, ' '))
      console.error(err)
    } else {
      console.error(err)
    }
  })
