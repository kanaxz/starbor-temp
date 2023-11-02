const { HasMany } = require('modeling/types')
const Group = require('./Group')
const User = require('./User')
const Membership = require('./Membership')

Group.properties({
  owner: {
    type: User,
    state: {
      disabled: true
    }
  },
  memberships: {
    type: HasMany.of(Membership),
    on: 'group'
  }
})

User.properties({
  memberships: {
    type: HasMany.of(Membership),
    on: 'user'
  }
})

Membership
  .properties({
    user: {
      type: User,
      state: {
        required: true,
      }
    },
    group: {
      type: Group,
      state: {
        required: true
      }
    }
  })

module.exports = {
  Group,
  User,
  Membership,
  Credentials: require('./Credentials'),
}