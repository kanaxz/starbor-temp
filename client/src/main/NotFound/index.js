const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
require('./style.scss')

module.exports = class NotFound extends Page {

}.define({
  name: 'app-not-found',
  template,
  layout: Main,
})