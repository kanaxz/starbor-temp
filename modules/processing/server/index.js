const exp = require('express')
const setup = require('./setup')

module.exports = {
  name: 'processing',
  dependancies: ['app', 'express', 'modeling'],
  async construct({ app, express, modeling }) {
    const collections = {}
    const map = []
    const router = new exp.Router()
    express.use('/api/collections', router)

    app.onReady(() => setup({ collections, map, router, modeling }))

    return {
      collections,
      map,
    }
  }
}