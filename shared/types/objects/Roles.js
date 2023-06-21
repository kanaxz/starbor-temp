const Object = require('core/modeling/Object')

module.exports = class Roles extends Object {

}
  .define({
    name: 'role',
  })
  .properties({
    admin: 'bool',
    editor: 'bool',
  })

