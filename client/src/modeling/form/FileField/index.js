const template = require('./template.html')
const Field = require('@app/fields/Field')
require('./style.scss')

module.exports = class FileField extends Field {

}
  .define({
    name: 'file-field',
    template,
  })
  .properties({

  })
