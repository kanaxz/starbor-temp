const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class BoolField extends Field {

}
  .define({
    name: 'bool-field',
    template,
  })