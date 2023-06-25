const mixer = require('../../mixer')
const Real = require('../Real')

module.exports = class Primitive extends mixer.extends(Real) {
  constructor() {
    throw new Error('Cannot instenciate')
  }

  static parse(value) {
    return value
  }

  static toJSON(value) {
    return value
  }

  static feed(object, property, value) {
    object[property.name] = value
  }
}
  .define({
    name: 'primitive',
  })