const { Model, String } = require('modeling/types')
const mixer = require('core/mixer')
const Pageable = require('modeling/mixins/Pageable')
const Wikiable = require('wiki/mixins/Wikiable')
const ControllerError = require('modeling/controlling/ControllerError')
const setup = require('./setup')

const isSelfOrAdmin = async (context, user) => {
  if (!context.user) {
    throw new ControllerError('User is not logged in')
  }
  if (!context.user.equals(user) && !await context.user.is(context, 'admin')) {
    throw new ControllerError(`User doesn't have sufficient rights`)
  }
  
}

module.exports = class User extends mixer.extends(Model, [Pageable, Wikiable, ...setup.user]) {
  async is(context, name) {
    await this.groups.load(context)
    return this.groups.some((group) => group.name === name)
  }

  toString(){
    return this.username
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
        required: false,
      }
    },
  })
  .controllers({
    create: {
      async check(context) {
        if (!context.signup && !context.setup && (!context.user || !await context.user.is(context, 'admin'))) {
          throw new ControllerError(`You cannot create an user`)
        }
      },
    },
    update: {
      check: isSelfOrAdmin,
    },
    delete: {
      check: isSelfOrAdmin
    }
  })
