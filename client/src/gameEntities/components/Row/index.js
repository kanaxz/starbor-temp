const Row = require('@app/modeling/components/Row')
const template = require('./template.html')
const { Entity } = require('shared/models')
require('./style.scss')

module.exports = class EntityRow extends Row { }
  .define({
    name: 'app-entity-row',
    template,
  })
  .register(Entity, 'row', {
    affiliation: true,
  })