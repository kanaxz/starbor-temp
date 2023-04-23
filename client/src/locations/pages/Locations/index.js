const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const api = require('@app/api')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const Location = require('shared/models/locations/Location')

require('../../components/LocationCard')
require('./style.scss')


module.exports = class LocationsPage extends Page {
  constructor() {
    super()
    //this.on('propertyChanged:typeName',this.b(this.onChange))
  }
  async changed() {
    console.log(this.typeFilter.getFilters())
    return
    this.locations = await api.collections.locations.find(
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

  async initialize() {
    await super.initialize()
    this.changed()
  }

  templateCard(location) {
    const cardComponent = componentsService.get(location.constructor, 'card')
    return new cardComponent(location)
  }

}
  .define({
    name: 'app-locations-page',
    template,
    layout: Main,
  })
  .variables({
    Location,
  })
  .properties({
    locations: 'any',
    typeName: 'any',
  })