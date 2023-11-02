const setup = require('./setup')

module.exports = {
  name: 'processing',
  dependancies: ['core', 'modeling'],
  async construct({ core, modeling }) {
    const collections = {}
    const map = []

    core.onReady(() => setup({ collections, map, modeling }))

    return {
      collections,
      map,
    }
  }
}