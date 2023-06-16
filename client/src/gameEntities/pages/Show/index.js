const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
require('./style.scss')

module.exports = class PlanetShowPage extends Page {

}
  .define({
    name: 'game-entity-show-page',
    template,
    layout: Main,
  })
  .variables({
    defaultImage
  })
  .properties({
    entity: 'any',
  })