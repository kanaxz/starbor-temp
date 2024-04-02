const setup = require('../../modeling/server/setup')


module.exports = {
  name: 'modeling',
  dependencies: ['core'],
  async construct({ core }) {
    const collections = {}
    const controllers = []
    const map = []

    const purge = async () => {
      for (const collection of Object.values(collections)) {
        await collection.purge()
      }
    }

    core.on('purge', purge)
    core.on('ready', () => setup({ collections, map, controllers }))


    const controller = (type, controller) => {
      controllers.push({
        type,
        controller
      })
    }

    return {
      controller,
      controllers,
      map,
      collections
    }
  }
}