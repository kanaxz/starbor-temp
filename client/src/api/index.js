const config = require('@app/config')
const { getCollections } = require('client-shared/modeling')

const collections = getCollections(config.server.url)

module.exports = {
  collections
}
