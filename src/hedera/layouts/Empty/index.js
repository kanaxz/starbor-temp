const Layout = require('sools-hedera/routing/Layout')
const template = require('./template.html')
require('./style.scss')

module.exports = class Empty extends Layout {

}.define({
  name: 'empty-layout',
  template,
})