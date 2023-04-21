const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
require('./style.scss')

module.exports = class LocationPage extends Page {

}.define({
  name: 'app-location-page',
  template,
  layout: Main,
})