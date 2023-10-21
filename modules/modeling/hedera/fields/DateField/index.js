const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class DateField extends Field {
  constructor() {
    super()
    this.value = ''
  }



}
  .define({
    name: 'date-field',
    template,
  })
