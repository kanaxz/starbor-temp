const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
require('./style.scss')

module.exports = class Home extends Page {

}.define({
  name: 'app-home',
  template,
  layout: Main,
})