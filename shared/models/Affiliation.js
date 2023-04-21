const Model = require('core/modeling/Model')

module.exports = class Affiliation extends Model {

}
  .properties({
    color: 'string',
    name: 'string',
    code: 'string',
  })
  .identities({
    code: ['code']
  })
  .define({
    name: 'affiliation',
    pluralName: 'affiliations',
  })