const mixer = require('core/mixer')
const GameModel = require('../GameModel')
const Organization = require('../Organization')
const { String, Branch, HasMany } = require('modeling/types')

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
    name: {
      type: String,
      state: {
        required: true,
      }
    },
    parents: {
      type: Branch.of(Entity),
      on: 'parent',
    },
    children: {
      type: HasMany.of(Entity),
      on: 'parent',
    }
  })
  .controllers({
    update: {
      logic(context, states, oldValue) {
        console.log(states.parent)
        states.parent.filters.push({
          $neq: ['$_id', oldValue._id]
        })
      }
    }
  })


module.exports = Entity
