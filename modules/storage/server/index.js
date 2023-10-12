const { FileSystemObject } = require('storage')
const routes = require('./routes')
const setup = require('./setup')
const StorageCollection = require('./StorageCollection')

module.exports = {
  name: 'storage',
  dependancies: ['app', 'express', 'config', 'processing', 'mongo'],
  async construct({ app, express, config, processing, mongo }) {
    processing.map.unshift([FileSystemObject, (type, controllers) => new StorageCollection(type, mongo.db, controllers, config)])
    routes({ express, config })
    app.onReady(setup)
  }
}