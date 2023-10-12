const { Entity } = require('shared/types')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Entity, {
      async find(req, pipeline, query, next) {
        const entities = await next()
        return entities
      },
    })
  }
}