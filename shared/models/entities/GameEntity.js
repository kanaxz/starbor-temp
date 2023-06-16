const Entity = require('./Entity')
const Starmap = require('../Starmap')
const mixer = require('core/mixer')
const Pageable = require('../../mixins/Pageable')

module.exports = class GameEntity extends mixer.extends(Entity, [Pageable]) {

}
  .define({
    name: 'gameEntity',
    abstract: true,
    searchField: 'name',
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

    starmap: Starmap,
    image: 'string',
  })