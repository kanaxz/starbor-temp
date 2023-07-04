const Field = require('../Field')
const template = require('./template.html')
require('./style.scss')

module.exports = class TextField extends Field {

}
  .define({
    name: 'markdown-field',
    template,
  })