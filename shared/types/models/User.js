const Model = require('core/modeling/Model')
const Roles = require('../objects/Roles')

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
    username: 'string',
    password: 'string',
    roles: Roles
  })