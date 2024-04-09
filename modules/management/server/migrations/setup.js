const { Group, User } = require('management')

module.exports = async (context, options) => {
  const { model: adminGroup } = await Group.collection.findOrCreate(context, {
    '@type': 'group',
    name: 'admin',
  })
  context.adminGroup = adminGroup
  const { model: user } = await User.collection.findOrCreate(context, {
    '@type': 'user',
    ...options.management.systemUser,
    groups: [
      context.adminGroup
    ]
  })
  context.user = user
}