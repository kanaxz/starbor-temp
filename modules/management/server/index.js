
const setup = require('./setup')

module.exports = {
  name: 'management',
  dependancies: ['core', 'config',],
  async construct({ core, config }) {
    core.onReady((req) => setup(req, config))
  }
}