const Object = require('../Object')
const Base = require('./Base')
const Bool = require('./Bool')

module.exports = class Type extends Object {
  static build(value, property) {
    return value
  }

  static toJSON(value, property) {
    return value
  }
}
  .properties({
    type: 'string',
  })

Object