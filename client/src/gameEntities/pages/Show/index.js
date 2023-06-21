const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const componentsService = require('@app/main/componentsService')
require('./style.scss')

module.exports = class PlanetShowPage extends Page {
  async initialized() {
    await this.entity.children.load()
    return super.initialized()
  }

  templateChild(child) {
    const card = componentsService.get(child.constructor, 'card')
    return new card(child)
  }
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