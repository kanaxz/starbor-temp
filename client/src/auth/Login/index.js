const Page = require('hedera/page/Page')
const Empty = require('@app/layouts/Empty')
const template = require('./template.html')
const Auth = require('../service')
const navigator = require('@app/navigator')

require('./style.scss')

module.exports = class Home extends Page {
  async onSubmit() {
    console.log('submitting')
    await Auth.login({

    })

    await navigator.navigate('/')
  }
}.define({
  name: 'app-login',
  template,
  layout: Empty,
})