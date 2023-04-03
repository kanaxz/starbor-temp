const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
require('./style.scss')

module.exports = class Market extends Page {

}.define({
  name: 'app-market',
  template,
  layout: Main,
})