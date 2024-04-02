const { Group, User } = require('management')

module.exports = async (req, options) => {
  req.adminGroup = await Group.collection.findOne(req, [{
    $eq: ['$name', 'admin']
  }])
  req.user = await User.collection.findOne(req, [{
    $eq: ['$username', options.management.systemUser.username]
  }])
}