const { Model, String } = require('sools-modeling/types')
const mixer = require('sools-core/mixer')
const Pageable = require('sools-modeling/mixins/Pageable')
const Wikiable = require('sools-wiki/mixins/Wikiable')
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
  })

