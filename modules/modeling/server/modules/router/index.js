const exp = require('express')
const setup = require('./setup')

module.exports = {
  name: 'modeling-router',
  dependencies: ['core', 'express', 'modeling'],
  async construct({ core, express, modeling }) {
    const router = new exp.Router()
    express.use('/api/collections', router)
    core.on('ready', () => setup({ modeling, router }))
  }
}