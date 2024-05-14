const AuthService = require('management-hedera/AuthService')
const NotificationsService = require('hedera/notifications/NotificationsService')
const global = require('hedera/global')
const Navigator = require('hedera/routing/Navigator')
const MenuService = require('core-hedera/MenuService')
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
