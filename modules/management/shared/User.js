const { Model, String } = require('modeling/types')

const isSelfOrAdmin = async (context, user) => {
  if (!context.user) { return false }
  return await context.user.equals(user) || context.user.is('admin')
}

module.exports = class User extends Model {
  async is(name) {
    await this.load({
      memberships: {
        group: true
      }
    })

    return this.memberships.some(({ group }) => group.name === name)
  }
}
  .define({
    name: 'user',
    pluralName: 'users',
    root: true,
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
  })
  .controllers({
    create: {
      async check(context) {
        return !context.user || await context.user.is('admin')
      },
    },
    update: {
      check: isSelfOrAdmin,
    },
    delete: {
      check: isSelfOrAdmin
    }
  })
