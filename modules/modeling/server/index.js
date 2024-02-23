const setup = require('../../modeling/server/setup')


module.exports = {
  name: 'modeling',
  dependancies: ['core'],
  async construct({ core }) {
    const collections = {}
    const controllers = []
    const map = []

    core.onReady(() => setup({ collections, map, controllers }))

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