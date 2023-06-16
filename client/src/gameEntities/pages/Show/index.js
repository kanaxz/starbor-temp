const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
require('./style.scss')

module.exports = class PlanetShowPage extends Page {
  
}.define({
  name: 'game-entity-show-page',
  template,
  layout: Main,
})
  .properties({
    entity: 'any',
  })