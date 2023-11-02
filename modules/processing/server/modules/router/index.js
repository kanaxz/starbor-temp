const exp = require('express')
const setup = require('./setup')

module.exports = {
  name: 'processing-router',
  dependancies: ['core', 'express', 'processing'],
  async construct({ core, express, processing }) {
    const router = new exp.Router()
    express.use('/api/collections', router)

    core.onReady(() => setup({ processing, router }))
  }
}