require('sools-core/setup')
require('ressourcing/setup')
require('sools-modeling-client/setup')
require('sools-modeling/setup')
require('storage-client/setup')
require('sools-auth-client/setup')
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