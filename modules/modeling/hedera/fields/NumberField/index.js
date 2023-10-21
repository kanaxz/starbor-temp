const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class NumberField extends Field {

}
  .define({
    name: 'number-field',
    template,
  })
  .properties({
    step: 'any',
  })
