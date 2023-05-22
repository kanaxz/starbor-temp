const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const notifications = require('@app/notifications')
const Array = require('core/types/Array')
require('./style.scss')

module.exports = class Home extends Page {
  constructor() {
    super()
    this.objects = new Array()
  }

  add() {
    this.objects.push({
      id: Math.random()
    })
  }

  sort() {
    this.objects.sort((a, b) => b.id - a.id)
  }

  notify() {
    notifications.notify({
      type: 'info',
      message: 'Un Citizen vous veut du bien !'
    })
  }
}.define({
  name: 'app-home',
  template,
  layout: Main,
})