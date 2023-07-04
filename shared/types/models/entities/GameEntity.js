const Entity = require('./Entity')
const Starmap = require('../../objects/Starmap')
const mixer = require('core/mixer')
const Pageable = require('../../../mixins/Pageable')
const Markdown = require('../../Markdown')
const { String } = require('core/modeling/types')

module.exports = class GameEntity extends mixer.extends(Entity, [Pageable]) {
  toString() {
    return this.name || this.code || this._id
  }
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
    code: String,
    description: Markdown,

    starmap: Starmap,
    image: String,
  })