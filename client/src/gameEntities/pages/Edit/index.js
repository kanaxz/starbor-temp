const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const componentsService = require('@app/main/componentsService')
require('./style.scss')

module.exports = class PlanetShowPage extends Page {
  async initialized() {
    await super.initialized()
    const canUpdate = await this.entity.canUpdate()
    if (!canUpdate) {
      throw new Error('Cannot edit')
    }
    this.canDelete = await this.entity.canDelete()
  }

}
  .define({
    name: 'game-entity-edit-page',
    template,
    layout: Main,
  })
  .variables({
    defaultImage
  })
  .properties({
    entity: 'any',
    canDelete: 'any',
  })