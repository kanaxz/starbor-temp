const { Model } = require('core/modeling/types')
const UserOrganization = require('./UserOrganization')
const User = require('./User')

class Member extends Model {

}
Member
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

module.exports = Member

UserOrganization
  .properties({
    members: {
      type: HasMany.of(Member),
    }
  })