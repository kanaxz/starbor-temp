const { FileSystemObject } = require('storage')
const routes = require('./routes')
const setup = require('./setup')
const StorageCollection = require('./StorageCollection')

module.exports = {
  name: 'storage',
  after: 'auth',
  dependancies: ['core', 'express', 'config', 'processing', 'mongo'],
  async construct({ core, express, config, processing, mongo }) {
    processing.map.unshift([FileSystemObject, (type, controllers) => new StorageCollection(type, mongo.db, controllers, config)])
    routes({ express, config })
    core.onReady(setup)
  }
}