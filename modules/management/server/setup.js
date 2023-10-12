const { Group, Membership, User } = require('management')

const password = "123"
const superAdminName = 'admin'
module.exports = async (req) => {

  let superAdmin = await User.collection.findOne(req, [{
    $eq: ['$username', superAdminName]
  }])
  if (!superAdmin) {
    superAdmin = await User.collection.create(req, {
      '@type': 'user',
      username: superAdminName,
      password,
    })
  }

  req.user = superAdmin
  
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
      $eq: ['$user', superAdmin._id]
    },
    {
      $eq: ['$group', adminGroup._id]
    }
  ])

  if (!adminMembership) {
    await Membership.collection.create(req, {
      '@type': 'membership',
      user: superAdmin.toJSON(),
      group: adminGroup.toJSON()
    })
  }

  await superAdmin.load(req, {
    memberships: {
      group: true,
    }
  })
}