const Entity = require('./Entity')
const Starmap = require('../../objects/Starmap')
const mixer = require('core/mixer')
const Pageable = require('../../../mixins/Pageable')
const Markdown = require('../../Markdown')

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
    description: Markdown,

    starmap: Starmap,
    image: 'string',
  })