require('shared/types')
const config = require('@app/config')
const { buildCollections } = require('../../../modules/processing/client')

const collections = buildCollections(config.server.url)
console.log({ collections })
module.exports = {
  collections
}
