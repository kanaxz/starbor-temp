const config = require('../config')
const { buildCollections } = require('../../modules/processing/client')
module.exports = (services) => {
  let tokenInfos = null
  const headersBuilder = async () => {
    if (!tokenInfos || tokenInfos.expireDate < new Date()) {
      tokenInfos = await fetch(`${config.server}/jwt-token`, config.jwt)
    }

    return {
      authorization: `Bearer ${tokenInfos.token}`
    }
  }
  const collections = buildCollections(config.server, { autoHold: true, headersBuilder })
  services.collections = collections
}