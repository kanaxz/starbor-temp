const AppComponent = require('@app/main/AppComponent')
const template = require('./template.html')
const System = require('shared/models/locations/System')
const defaultImage = require('../defaultImage.png')
require('./style.scss')

module.exports = class SystemCard extends AppComponent {
  constructor(location) {
    super()
    this.location = location
  }
}
  .define({
    name: 'app-system-card',
    template,
  })
  .variables({
    defaultImage,
  })
  .registry(System, 'card')
  .properties({
    location: 'any',
  })
