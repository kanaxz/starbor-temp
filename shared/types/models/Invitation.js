const { Model, String } = require('core/modeling/types')
const Organization = require('./Organization')
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
    organization: {
      type: Organization,
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

