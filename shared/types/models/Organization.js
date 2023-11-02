const { Model, String } = require('modeling/types')
const mixer = require('core/mixer')
const StarMap = require('../objects/Starmap')
const Pageable = require('modeling/mixins/Pageable')
const Wikiable = require('wiki/mixins/Wikiable')
const Imageable = require('storage/mixins/Imageable')
const Folderable = require('storage/mixins/Folderable')

module.exports = class Organization extends mixer.extends(Model, [Pageable, Imageable, Folderable, Wikiable]) {
  toString() {
    return this.name || this.code || this._id
  }
}
  .define({
    name: 'organization',
    pluralName: 'organizations',
    root: true,
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
    color: String,
    name: String,
    starmap: StarMap,
  })

