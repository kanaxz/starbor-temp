require('core/setup')
require('ressourcing/setup')
require('modeling-client/setup')
require('modeling/setup')
require('management-client/setup')
require('storage-client/setup')
require('../modules/starbor/shared/types')
require('jwt/setup')

const loadersNames = [
  require('./loaders/collections'),
  require('./loaders/starmap')
]

const start = async () => {
  const services = {}
  for (const loader of loadersNames) {
    await loader(services)
  }
  console.log('-------- LOADING FINISHED --------')
}

start()