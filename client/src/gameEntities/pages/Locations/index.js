const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const api = require('@app/api')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const { Entity } = require('shared/models')

require('../../components/EntityCard')
require('./style.scss')


module.exports = class EntitiesPage extends Page {
  constructor() {
    super()
    this.filters = []
    this.templates = {}
    //this.on('propertyChanged:typeName',this.b(this.onChange))
  }
  async changed() {
    console.log(this.typeFilter.getFilters())
    return
    this.entities = await api.collections.entities.find(
      this.typeFilter.filters,
      {
        limit: 50,
        load: {
          affiliation: true,
        },
        type: this.typeSelector.current.definition.name,
      }
    )
  }

  filterChanged() {

  }

  async initialize() {
    await super.initialize()
    this.changed()
  }

  templateCard(entity) {
    const cardComponent = componentsService.get(entity.constructor, 'card')
    return new cardComponent(entity)
  }

}
  .define({
    name: 'app-entitys-page',
    template,
    layout: Main,
  })
  .variables({
    Entity,
  })
  .properties({
    entities: 'any',
    typeName: 'any',
    type: 'any',
  })