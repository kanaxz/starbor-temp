const AppComponent = require('@app/main/AppComponent')
const template = require('./template.html')
const Location = require('@shared/models/locations/Location')
require('./style.scss')

module.exports = class LocationCard extends AppComponent {
  constructor(location) {
    super()
    this.location = location
  }
}
  .registry(Location, 'card', {
    affiliation: true,
  })
  .properties({
    location: 'any',
  })
  .define({
    name: 'app-location-card',
    template,
  })