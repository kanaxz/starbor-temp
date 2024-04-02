const config = require('./config')
const AuthService = require('management-hedera/AuthService')
const NotificationsService = require('./notifications/NotificationsService')
const global = require('hedera/global')
const Navigator = require('hedera/routing/Navigator')
const Loader = require('./main/components/Loader')
const MenuService = require('core-hedera/MenuService')

Object.assign(global, {
  auth: new AuthService(config.server.url),
  notifications: new NotificationsService(),
  navigator: new Navigator(),
  menu: new MenuService()
})

global.menu.links.push({
  label: 'Home',
  class: 'fa-solid fa-house',
  url: '/',
})

Object.assign(global.components, {
  Loader
})
module.exports = global