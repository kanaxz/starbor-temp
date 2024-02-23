const { HasMany, OwnMany } = require('modeling/types')
const Group = require('./Group')
const User = require('./User')

Group.properties({
  users: {
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