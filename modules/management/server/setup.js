const { Group, Membership, User } = require('management')

module.exports = async (req, config) => {
  const systemUserValues = config.management.systemUser
  let systemUser = await User.collection.findOne(req, [{
    $eq: ['$username', systemUserValues.username]
  }])
  if (!systemUser) {
    systemUser = await User.collection.create(req, {
      '@type': 'user',
      ...systemUserValues,
    })
  }

  req.user = systemUser
  
  let adminGroup = await Group.collection.findOne(req, [{ $eq: ['$name', 'admin'] }])
  if (!adminGroup) {
    adminGroup = await Group.collection.create(req, {
      '@type': 'group',
      name: 'admin',
    })
  }

  req.adminGroup = adminGroup

  let adminMembership = await Membership.collection.findOne(req, [
    {
      $eq: ['$user', systemUser._id]
    },
    {
      $eq: ['$group', adminGroup._id]
    }
  ])

  if (!adminMembership) {
    await Membership.collection.create(req, {
      '@type': 'membership',
      user: systemUser.toJSON(),
      group: adminGroup.toJSON()
    })
  }

  await systemUser.load(req, {
    memberships: {
      group: true,
    }
  })
}