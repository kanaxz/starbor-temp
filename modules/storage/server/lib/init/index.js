const StorageObject = require('storage/StorageObject')
const StorageCollection = require('./StorageCollection')

module.exports = ({ modeling, mongo }, config) => {
  modeling.map.unshift([StorageObject, (type, controllers) => new StorageCollection(type, mongo.db, controllers, config)])
}