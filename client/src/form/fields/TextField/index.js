const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class TextField extends Field {
  constructor() {
    super()
    this.value = ''
    return
    this.errors = [{
      message: 'some error'
    }]
  }
  
}
  .define({
    name: 'form-text-field',
    template,
  })
  .properties({
    type: 'string',
    errors: 'any',
  }) 