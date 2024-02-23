const exp = require('express')
const setup = require('./setup')

module.exports = {
  name: 'modeling-router',
  dependancies: ['core', 'express', 'modeling'],
  async construct({ core, express, modeling }) {
    const router = new exp.Router()
    express.use('/api/collections', router)
    core.onReady(() => setup({ modeling, router }))
  }
}