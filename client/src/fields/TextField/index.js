const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class TextField extends Field {
  onValueChanged() {
     this.value = this.value.trim()
     return super.onValueChanged()
  }

}
  .define({
    name: 'text-field',
    template,
  })