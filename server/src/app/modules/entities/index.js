const { Entity } = require('shared/types')

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling }) {
    modeling.controller(Entity, {

    })
  }
}