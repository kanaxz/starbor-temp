const { User } = require('management')
const UserCollection = require('./UserCollection')

module.exports = ({ modeling, mongo }, config) => {
  modeling.map.unshift([User, (type, controllers) => new UserCollection(type, mongo.db, controllers, config)])
}