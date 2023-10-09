const { Model, String } = require('core/modeling/types')
const Roles = require('../objects/Roles')

const isAdminOrSelf = (context, user) => {
  if (!context.user.roles.admin && context.user.id !== user._id) {
    throw new Error('Cannot update user')
  }
}

const emptyRoles = new Roles({
  admin: false,
  editor: false,
})

module.exports = class User extends Model {

}
  .define({
    name: 'user',
    pluralName: 'users',
  })
  .indexes({
    username: {
      properties: ['username'],
      unique: true,
    }
  })
  .properties({
    username: {
      type: String,
      state: {
        required: true,
      }
    },
    password: {
      type: String,
      state: {
        required: true,
      }
    },
    roles: {
      type: Roles,
      state: {
        required: true,
      }
    }
  })
  .controllers({
    create: {
      check(context) {
        if (context.user && !context.user.roles.admin) {
          throw new error('You are already connected')
        }
      },
      logic(context, user) {
        if (!context.user?.roles.admin) {
          Object.assign(user.roles, {
            value: emptyRoles,
            disabled: true,
          })
        }
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
