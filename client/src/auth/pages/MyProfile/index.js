const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const auth = require('../../service')
const navigator = require('@app/navigator')
const ChangePassword = require('../../components/ChangePassword')


require('./style.scss')

module.exports = class MyProfile extends Page {
  constructor() {
    super()
    this.MyDataIsOpen = false
    this.EditMyDataIsOpen = false
  }

}.define({
  name: 'myprofile-page',
  template,
  layout: Main,
})
  .properties({
    MyDataIsOpen: 'any',
    EditMyDataIsOpen: 'any',
  })
  .variables({
    auth,
  })


