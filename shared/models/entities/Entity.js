const mixer = require('core/mixer')
const Branch = require('core/modeling/types/Branch')
const GameModel = require('../GameModel')
const Organization = require('../Organization')
const Starmap = require('../Starmap')

class Entity extends mixer.extends(GameModel) {

}

Entity
  .define({
    name: 'entity',
    pluralName: 'entities',
    searchField: 'name',
    abstract: true,
  })
  .indexes({
    code: {
      properties: ['code'],
      unique: true,
    }
  })
  .properties({
    name: 'string',
    code: 'string',
    description: 'string',
    organization: Organization,
    parent: Entity,
    parents: {
      type: Branch.of(Entity),
      on: 'parent',
    },
    starmap: Starmap,
    image: 'string',
  })


module.exports = Entity
