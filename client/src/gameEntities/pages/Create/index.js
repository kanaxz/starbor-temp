const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const defaultImage = require('../../assets/defaultImage.jpg')
const componentsService = require('@app/main/componentsService')
const navigator = require('@app/navigator')
const { Entity } = require('shared/types')

require('./style.scss')

module.exports = class CreateEntityPage extends Page {
  async onSaved({ model }) {
    await navigator.navigate(model.url)
  }
}
  .define({
    name: 'entity-create-page',
    template,
    layout: Main,
  })
  .variables({
    defaultImage,
    Entity
  })
  .properties({
    entity: 'any',
    canDelete: 'any',
  })