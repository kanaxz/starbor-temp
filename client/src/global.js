console.log('required project setup')
const config = require('./config')
const AuthService = require('management-hedera/AuthService')
const NotificationsService = require('./notifications/NotificationsService')
const global = require('hedera/global')
const Navigator = require('hedera/routing/Navigator')
const Loader = require('./main/components/Loader')

Object.assign(global, {
  auth: new AuthService(config.server.url),
  notifications: new NotificationsService(),
  navigator: new Navigator(),
})

console.log({ Loader })
Object.assign(global.components, {
  Loader
})
module.exports = global