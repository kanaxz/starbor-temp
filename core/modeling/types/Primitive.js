const mixer = require('../../mixer')
const Any = require('../Any')

module.exports = class Primitive extends mixer.extends([Any]) {
  constructor() {
    throw new Error('Cannot instenciate')
  }

  static parse(value) {
    return value
  }

  static toJSON(value, context) {
    return value
  }

  static feed(object, property, value) {
    object[property.name] = value
  }
}
  .define({
    name: 'primitive',
  })