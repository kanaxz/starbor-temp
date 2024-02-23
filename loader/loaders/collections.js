const config = require('../config')
const { buildCollections } = require('modeling-client')
const moment = require('moment')

module.exports = (services) => {
  let tokenInfos = null
  const headersBuilder = async () => {
    if (!tokenInfos || moment(tokenInfos.expireDate).toDate() < new Date()) {
      const res = await fetch(`${config.server}/jwt-token`, {
        method: 'POST',
        body: JSON.stringify(config.jwt),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      tokenInfos = await res.json()
    }

    return {
      authorization: `Bearer ${tokenInfos.token}`
    }
  }
  const collections = buildCollections(config.server, { autoHold: true, headersBuilder })
  services.collections = collections
}