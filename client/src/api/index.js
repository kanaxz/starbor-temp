const config = require('@app/config')
const { buildCollections } = require('processing-client')

const collections = buildCollections(config.server.url)

module.exports = {
  collections
}
