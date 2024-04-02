const config = require('../config')
const { buildCollections } = require('modeling-client')
const moment = require('moment')
const https = require('https')
const httpsAgent = new https.Agent(config.server.agent)
const axios = require('axios')

module.exports = (services) => {
  let tokenInfos = null
  const headersBuilder = async () => {
    if (!tokenInfos || moment(tokenInfos.expireDate).toDate() < new Date()) {
      const res = await axios({
        url: `${config.server.url}/jwt-token`,
        method: 'POST',
        data: config.jwt,
        headers: {
          'Content-Type': 'application/json'
        },
        httpsAgent
      })
      tokenInfos = res.data
    }

    return {
      authorization: `Bearer ${tokenInfos.token}`
    }
  }
  buildCollections(config.server.url,
    {
      autoHold: true,
      headersBuilder,
      axiosOptions: {
        httpsAgent
      }
    })
}