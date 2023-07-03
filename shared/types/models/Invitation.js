const { Model, String } = require('core/modeling/types')
const UserOrganization = require('./UserOrganization')
const User = require('./User')

module.exports = class Invitation extends Model {

}
  .define({
    name: 'invitation',
    pluralName: 'invitations',
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
    initiator: {
      type: String,
      values: ['user', 'organization'],
      readonly: true,
      required: true,
    },
    status: {
      type: String,
      values: ['pending', 'canceled', 'accepted', 'refused'],
      required: true,
    },
  })


