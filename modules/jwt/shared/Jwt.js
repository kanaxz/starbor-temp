const mixer = require('core/mixer')
const { Model, String } = require('modeling/types')
const User = require('management/User')
const securityStrategy = require('management/securityStrategy')
const ControllerError = require('modeling/controlling/ControllerError')

module.exports = class Jwt extends mixer.extends(Model) {

}
  .define({
    name: 'jwt',
    pluralName: 'jwts',
    root: true,
  })
  .properties({
    user: {
      type: User,
      state: {
        required: true,
      }
    },
    name: {
      type: String,
      state: {
        required: true
      }
    },
    id: {
      type: String,
      state: {
        disabled: true,
      }
    },
    key: {
      type: String,
      state: {
        disabled: true
      }
    }
  })
  .controllers({
    create: {
      requires: [securityStrategy],
      check(context) {
        if (!context.user) {
          throw new ControllerError(`You must be connected to create a jwt'`)
        }
      },
    },
    update: {
      requires: [securityStrategy],
      check(context, jwt) {
        if (!jwt.user.equals(context.user)) {
          throw new ControllerError(`User don't have sufficient rights`)
        }
      },
    }
  })