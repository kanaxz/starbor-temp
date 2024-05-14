require('core/setup')
require('ressourcing/setup')
require('modeling-client/setup')
require('modeling/setup')
require('storage-client/setup')
require('management-client/setup')
require('../modules/starbor/shared/types')
require('jwt')

const loadersNames = [
  require('./loaders/collections'),
  require('./loaders/starmap')
]

global.FormData = require('form-data')

const start = async () => {
  const services = {}
  for (const loader of loadersNames) {
    await loader(services)
  }
  console.log('-------- LOADING FINISHED --------')
}

start()