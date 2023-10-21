const { Model, String } = require('modeling/types')
const mixer = require('core/mixer')
const Pageable = require('modeling/mixins/Pageable')
const Wikiable = require('wiki/mixins/Wikiable')

const isSelfOrAdmin = async (context, user) => {
  console.log({ context, user })
  if (!context.user) { return false }
  return context.user.equals(user) || await context.user.is('admin')
}

module.exports = class User extends mixer.extends(Model, [Pageable, Wikiable]) {
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
    codeField: 'username',
    searchField: 'username',
    titleField: 'username',
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
