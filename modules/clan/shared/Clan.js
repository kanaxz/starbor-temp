const ControllerError = require('modeling/controlling/ControllerError')
const { Model, String } = require('modeling/types')

const isAdminOrSelf = async (context, user) => {
  if (!context.user.equals(user) && !await context.user.is(context, 'admin')) {
    throw new ControllerError('You cannot manage user')
  }
}

module.exports = class Clan extends Model {

}
  .define({
    name: 'clan',
    pluralName: 'clans',
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
        if (!context.user) {
          throw new ControllerError(`You cannot create a new clan`)
        }
      },
    },
    update: {
      check: isAdminOrSelf,
    },
    delete: {
      check: isAdminOrSelf
    }
  })
