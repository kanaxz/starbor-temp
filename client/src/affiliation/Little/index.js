const AppComponent = require('@app/main/AppComponent')
const template = require('./template.html')
const Affiliation = require('@shared/models/Affiliation')
require('./style.scss')

module.exports = class AffiliationLittle extends AppComponent {
  constructor(affiliation) {
    super()
    this.affiliation = affiliation
  }
}
  .registry(Affiliation, 'little')
  .properties({
    affiliation: 'any',
  })
  .define({
    name: 'app-affiliation-little',
    template,
  })