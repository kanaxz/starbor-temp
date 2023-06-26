const { Object } = require('core/modeling/types')

module.exports = class Roles extends Object {

}
  .define({
    name: 'role',
  })
  .properties({
    admin: 'bool',
    editor: 'bool',
  })

