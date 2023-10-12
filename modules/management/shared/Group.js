const { Model, String } = require('modeling/types')

const isAdminOrSelf = (context, user) => {
  if (!context.user.roles.admin && context.user.id !== user._id) {
    throw new Error('Cannot update user')
  }
}

module.exports = class Group extends Model {

}
  .define({
    name: 'group',
    pluralName: 'groups',
    root: true,
  })
  .indexes({
    name: {
      properties: ['name'],
      unique: true,
    }
  })
  .properties({
    name: {
      type: String,
      state: {
        required: true,
      }
    },
  })
  .controllers({
    create: {
      check(context) {
        return !!context.user
      },
      logic(context, user) {
        
      }
    },
    update: {
      check: isAdminOrSelf,
      logic(context, newUser, oldUser) {
        if (!context.user?.roles.admin) {
          newUser.roles.disabled = true
        }
      }
    },
    delete: {
      check: isAdminOrSelf
    }
  })
