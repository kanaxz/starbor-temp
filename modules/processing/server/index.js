const exp = require('express')
const setup = require('./setup')

module.exports = {
  name: 'processing',
  dependancies: ['core', 'express', 'modeling'],
  async construct({ core, express, modeling }) {
    const collections = {}
    const map = []
    const router = new exp.Router()
    express.use('/api/collections', router)

    core.onReady(() => setup({ collections, map, router, modeling }))

    return {
      collections,
      map,
    }
  }
}