const mixer = require('sools-core/mixer')
const GameModel = require('../GameModel')
const Organization = require('../Organization')
const { String, Branch, HasMany } = require('sools-modeling/types')

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
    create:{
      check(context){
        return !!context.user
      }
    },
    update: {
      logic(context, states, oldValue) {
        states.parent.filters.push({
          $neq: ['$_id', oldValue._id]
        })
      }
    }
  })


module.exports = Entity
