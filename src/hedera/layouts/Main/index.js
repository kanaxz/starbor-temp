const Layout = require('sools-hedera/routing/Layout')
const template = require('./template.html')
require('./style.scss')
require('sools-modeling-hedera/components/SearchBar')
const { auth, menu } = require('sools-hedera/global')

module.exports = class Main extends Layout {
  constructor() {
    super()
    this.menus = Array.from(Array(9)) 
  }
}
  .define({
    name: 'app-layout-main',
    template,
  })
  .variables({
    auth,
    menu,
  })
  .properties({
    open: 'any'
  })
  .localStorage({
    name: 'main',
    properties: ['open'],
  })