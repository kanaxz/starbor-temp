const { Object, Bool } = require('core/modeling/types')

module.exports = class Roles extends Object {

}
  .define({
    name: 'role',
  })
  .properties({
    admin: Bool,
    editor: Bool,
  })

