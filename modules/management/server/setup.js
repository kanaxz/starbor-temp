const { Group, Membership, User } = require('management')
const { StorageObject } = require('../../storage/shared')

module.exports = async ({ req, config, modeling }) => {


  const systemUserValues = config.management.systemUser
  /*
  let test = await StorageObject.collection.find(req, [])

  console.log(test.toJSON())
  process.exit()

  /**/

  let adminGroup = await Group.collection.findOne(req, [{ $eq: ['$name', 'admin'] }])
  if (!adminGroup) {
    adminGroup = await Group.collection.create(req, {
      '@type': 'group',
      name: 'admin',
    })
  }

  req.adminGroup = adminGroup

  /**/
  let systemUser = await User.collection.findOne(req, [{
    $eq: ['$username', systemUserValues.username]
  }])

  if (!systemUser) {
    systemUser = await User.collection.create(req, {
      '@type': 'user',
      ...systemUserValues,
      groups: [
        adminGroup
      ]
    })
  }

  req.user = systemUser

  /*

  const { collections } = modeling
  const objects = await collections.storage.find(req, [{ $eq: ['$path', '/storage/upload'] }])

  console.log(objects.map((o) => o.toJSON()))

  process.exit()
  /**/
}