require('starbor-shared/types')
const config = require('@app/config')
const { buildCollections } = require('modeling-client')

const collections = buildCollections(config.server.url)

module.exports = {
  collections
}
