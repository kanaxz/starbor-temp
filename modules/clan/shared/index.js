const { HasMany, OwnMany } = require('modeling/types')
const User = require('management/User')

Group.properties({
  owner: {
    type: User,
    state: {
      disabled: true
    }
  },
  memberships: {
    type: HasMany.of(User),
    on: 'groups'
  }
})

User.properties({
  groups: {
    type: OwnMany.of(Group),
  }
})

module.exports = {
  Group,
  User,
  Credentials: require('./Credentials'),
}