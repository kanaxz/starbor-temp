const { Bool, HasMany } = require('core/modeling/types')
const Organization = require('./Organization')
const User = require('./User')
const Markdown = require('../Markdown')


module.exports = class UserOrganization extends Organization {

}
  .define({
    name: 'userOrganization',
    pluralName: 'userOrganizations',
    collection: true,
  })
  .properties({
    owner: {
      type: User,
      required: true,
      readonly: true,
    },
    description: {
      type: Markdown,
      required: true,
      readonly: true,
    },
    private: {
      type: Bool,
      required: true,
      readonly: true,
    }
  })


