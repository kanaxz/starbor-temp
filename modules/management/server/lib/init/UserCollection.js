const MongoCollection = require('mongo/MongoCollection')
const { defaultLoad } = require('management/utils')

module.exports = class StorageCollection extends MongoCollection {

  static methods = [
    ...MongoCollection.methods,
    'me',
  ]

  async me(context) {
    return context.user
  }
}