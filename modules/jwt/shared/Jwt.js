const mixer = require('core/mixer')
const { Model, String } = require('modeling/types')
const User = require('management/User')
const securityStrategy = require('management/securityStrategy')

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
    name:{
      type: String,
      state:{
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
      check(context) { return !!context.user },
    },
    update: {
      requires: [securityStrategy],
      check(context, jwt) { return jwt.user.equals(context.user) },
    }
  })