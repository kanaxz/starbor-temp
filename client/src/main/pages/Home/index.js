const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const notifications = require('@app/notifications')
const notification = require('../../../notifications')
require('./style.scss')

module.exports = class Home extends Page {
  notify() {
    notification.notify({
      type: 'info', 
      message:'Un Citizen vous veut du bien !' 
    })
  }
}.define({
  name: 'app-home',
  template,
  layout: Main,
})