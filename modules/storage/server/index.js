require('storage')

const modules = [
  require('./lib/init'),
  require('./lib/file'),
  require('./lib/folder'),
  require('./lib/storageObject'),
  require('./lib/user'),
  require('./lib/routes'),
  
]

module.exports = {
  name: 'storage',
  after: 'auth',
  dependencies: ['express', 'modeling', 'mongo', 'management'],
  async construct(dependencies, config) {
    for (const module of modules) {
      await module(dependencies, config)
    }
  }
}