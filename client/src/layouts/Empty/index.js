const Layout = require('@core/page/Layout')
const template = require('./template.html')
require('./style.scss')

module.exports = class Empty extends Layout {

}.define({
  name: 'app-layout-empty',
  template,
})