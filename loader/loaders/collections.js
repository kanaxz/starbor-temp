const config = require('../config')
const { getCollections } = require('client-shared/modeling')
module.exports = (services) => {
  const collections = getCollections(config.server, { autoHold: true })
  services.collections = collections
}