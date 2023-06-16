const Card = require('@app/modeling/components/Card')
const template = require('./template.html')
const { Entity } = require('shared/models')
require('./style.scss')

module.exports = class EntityCard extends Card {
  constructor(entity) {
    super()
    this.entity = entity
  }
}
  .define({
    name: 'app-entity-card',
    template,
  })
  .register(Entity, 'card', {
    organizations: true,
  })
  .properties({
    entity: 'any',
  })
