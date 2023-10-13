const config = require('./config')
const AuthService = require('hedera/Service')

module.exports = {
  auth: new AuthService(config.server.url)
}