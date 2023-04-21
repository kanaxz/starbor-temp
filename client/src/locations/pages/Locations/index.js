const Page = require('@core/page/Page')
const Main = require('@app/layouts/Main')
const api = require('@app/api')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const Location = require('@shared/models/locations/Location')

require('../../components/LocationCard')
require('./style.scss')


module.exports = class LocationsPage extends Page {
  constructor() {
    super()
    //this.on('propertyChanged:typeName',this.b(this.onChange))
  }
  async onChange() {
    console.log('changed')
    this.locations = await api.collections.locations.find([
      {
        is: ['$this', this.typeSelector.current.definition.name]
      },
      {
        match: ['$name', this.name.value]
      }
    ], {
      limit: 50,
      load: {
        affiliation: true,
      }
    })
  }

  async initialize() {
    await super.initialize()
    this.onChange()
  }

  templateCard(location) {
    const cardComponent = componentsService.get(location.constructor, 'card')
    return new cardComponent(location)
  }

  typeChanged() {
    this.onChange()
  }
}
  .variables({
    Location,
  })
  .define({
    name: 'app-locations-page',
    template,
    layout: Main,
  })
  .properties({
    locations: 'any',
    typeName: 'any',
  })