const config = require('./config')
const AuthService = require('modeling-client/Service')
module.exports = {
  auth: new AuthService(config.server.url)
}