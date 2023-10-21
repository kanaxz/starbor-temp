const Row = require('modeling-hedera/components/Row')
const template = require('./template.html')
const { Entity } = require('shared/types')
require('./style.scss')

module.exports = class EntityRow extends Row {
  constructor(...args) {
    super(...args)
  }
}
  .define({
    name: 'app-entity-row',
    template,
  })
  .register(Entity, 'row', {
    affiliation: true,
  })