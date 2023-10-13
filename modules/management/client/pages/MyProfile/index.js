const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const context = require('hedera/context')

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
    context,
  })


