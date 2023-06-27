const mixer = require('core/mixer')
const GameModel = require('../GameModel')
const Organization = require('../Organization')
const { String, Branch, HasMany } = require('core/modeling/types')

class Entity extends mixer.extends(GameModel) {

}

Entity
  .define({
    name: 'entity',
    pluralName: 'entities',
    abstract: true,
    root: true,
  })

  .properties({
    organization: Organization,
    parent: Entity,
    name: String,
    parents: {
      type: Branch.of(Entity),
      on: 'parent',
    },
    /**/

    children: {
      type: HasMany.of(Entity),
      on: 'parent',
    }

  })


module.exports = Entity
