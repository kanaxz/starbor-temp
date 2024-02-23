const ControllerError = require('modeling/controlling/ControllerError')
const { Model, String } = require('modeling/types')
const setup = require('./setup')
const mixer = require('core/mixer')

const isAdminOrSelf = async (context, user) => {
  if (!context.user.equals(user) && !await context.user.is(context, 'admin')) {
    throw new ControllerError('You cannot manage user')
  }
}

module.exports = class Group extends mixer.extends(Model, [...setup.group]) {

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
        if (!context.setup && !context.user) {
          throw new ControllerError(`You cannot create groups`)
        }
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
