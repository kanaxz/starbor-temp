const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class FieldWrapper extends Component { }
  .define({
    name: 'form-field-wrapper',
    transclude: true,
    template,
  })
  .properties({
    field: 'any',
  }) 