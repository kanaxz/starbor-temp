const { Group, User } = require('management')

module.exports = async (req, config) => {
  req.adminGroup = await Group.collection.create(req, {
    '@type': 'group',
    name: 'admin',
  })

  req.user = await User.collection.create(req, {
    '@type': 'user',
    ...config.management.systemUser,
    groups: [
      req.adminGroup
    ]
  })
}