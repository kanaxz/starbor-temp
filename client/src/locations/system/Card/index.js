const AppComponent = require('@app/main/AppComponent')
const template = require('./template.html')
const System = require('shared/models/locations/System')
require('./style.scss')

module.exports = class SystemCard extends AppComponent {
  constructor(location) {
    super()
    this.location = location
  }
}
  .registry(System, 'card')
  .properties({
    location: 'any',
  })
  .define({
    name: 'app-system-card',
    template,
  })