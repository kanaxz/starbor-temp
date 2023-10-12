const { Object, String } = require('modeling/types')

const choices = ['none', 'private', 'public', 'parent', 'group']

module.exports = class Acces extends Object {
  static choices = choices
}
  .define({
    name: 'access',
  })
  .properties({
    read: {
      type: String,
      state: {
        choices
      }
    },
    edit: {
      type: String,
      state: {
        choices
      }
    },
  })