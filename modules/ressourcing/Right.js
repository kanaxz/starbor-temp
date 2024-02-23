const { Object, String, OwnMany } = require('modeling/types')
const RessourceOwner = require('./RessourceOwner')

const choices = ['private', 'public', 'inherited']

module.exports = class Right extends Object {
  static choices = choices
}
  .define({
    name: 'right',
  })
  .properties({
    owners: {
      type: OwnMany.of(RessourceOwner),
    },
    type: {
      type: String,
      state: {
        choices
      }
    }
  })
  .controllers({
    create: {
      logic(context, states) {
        
      }
    }
  })