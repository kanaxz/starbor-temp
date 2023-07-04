const { Model, String } = require('core/modeling/types')
const mixer = require('core/mixer')
const StarMap = require('../objects/Starmap')

module.exports = class Organization extends Model {
  toString() {
    return this.name || this.code || this._id
  }
}
  .define({
    name: 'organization',
    pluralName: 'organizations',
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

