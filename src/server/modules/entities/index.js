const { Entity } = require('../../../../../modules/starbor/shared/types')

module.exports = {
  dependencies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Entity, {

    })
  }
}