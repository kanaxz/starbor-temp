
const setup = require('./setup')

module.exports = {
  name: 'management',
  dependancies: ['core', 'config','modeling'],
  async construct(dependencies) {
    dependencies.core.onReady((req) => setup({ req, ...dependencies }))
  }
}