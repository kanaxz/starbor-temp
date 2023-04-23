const Model = require('core/modeling/Model')

module.exports = class Affiliation extends Model {

}
  .define({
    name: 'affiliation',
    pluralName: 'affiliations',
  })
  .properties({
    color: 'string',
    name: 'string',
    code: 'string',
  })
  .identities({
    code: ['code']
  })
