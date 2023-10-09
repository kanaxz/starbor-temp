const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class NumberField extends Field {
  importState(state) {
    super.importState(state)
    this.step = state.step || 1
  }
}
  .define({
    name: 'number-field',
    template,
  })
  .properties({
    step: 'any',
  })
