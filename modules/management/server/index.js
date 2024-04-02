const modules = [
  require('./lib/init')
]

module.exports = {
  name: 'management',
  dependencies: ['modeling', 'mongo'],
  async construct(dependencies, config) {
    for (const module of modules) {
      await module(dependencies, config)
    }
  }
}