const { Model } = require('modeling/types')

module.exports = class Membership extends Model {

}
  .define({
    name: 'membership',
    pluralName: 'memberships',
    root: true,
  })
  .indexes({
    pair: {
      properties: ['user', 'group'],
      unique: true,
    }
  })
  .properties({

  })
