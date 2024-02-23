const managementSetup = require('management/setup')
const UserMixin = require('./UserMixin')
const GroupMixin = require('./GroupMixin')

managementSetup.user.push(UserMixin)
managementSetup.group.push(GroupMixin)