const AppComponent = require('@app/main/AppComponent')
const template = require('./template.html')
const Location = require('shared/models/locations/Location')
require('./style.scss')

module.exports = class LocationCard extends AppComponent {
  constructor(location) {
    super()
    this.location = location
  }
}
  .define({
    name: 'app-location-card',
    template,
  })
  .registry(Location, 'card', {
    affiliation: true,
  })
  .properties({
    location: 'any',
  })
