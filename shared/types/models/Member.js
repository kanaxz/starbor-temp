const { Model } = require('core/modeling/types')
const UserOrganization = require('./UserOrganization')
const User = require('./User')

module.exports = class Member extends Model {

}
  .define({
    name: 'member',
    pluralName: 'members',
    collection: true,
  })
  .properties({
    user: {
      type: User,
      required: true,
      readonly: true,
    },
    userOrganization: {
      type: UserOrganization,
      required: true,
      readonly: true,
    },
  })

