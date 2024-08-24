const AuthService = require('sools-auth-hedera/AuthService')
const NotificationsService = require('sools-hedera/notifications/NotificationsService')
const global = require('sools-hedera/global')
const Navigator = require('sools-hedera/routing/Navigator')
const MenuService = require('sools-core-hedera/MenuService')
const BackgroundService = require('storage-hedera/BackgroundService')
const defaultBackground = require('./assets/background.jpg')
Object.assign(global, {
  auth: new AuthService(STARBOR_CONFIG.server.url),
  notifications: new NotificationsService(),
  navigator: new Navigator(),
  menu: new MenuService(),
  background: new BackgroundService(defaultBackground)
})





module.exports = global
