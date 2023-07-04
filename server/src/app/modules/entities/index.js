const { Entity, Roles } = require('shared/types')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Entity, {
      async find(req, pipeline, query, next) {
        console.log('left entities', pipeline)
        const entities = await next()
        console.log('right entities', entities.length)
        return entities
      },
    })
  }
}