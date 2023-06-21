const Model = require('core/modeling/Model')
const mixer = require('core/mixer')
const StarMap = require('../objects/Starmap')

module.exports = class Organization extends Model {

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
    code: 'string',
    color: 'string',
    name: 'string',
    starmap: StarMap,
  })

