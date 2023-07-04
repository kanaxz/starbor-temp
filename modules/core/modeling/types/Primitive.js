const mixer = require('../../mixer')
const Real = require('./Real')

module.exports = class Primitive extends mixer.extends(Real) {
  constructor() {
    throw new Error('Cannot instenciate')
  }

  static equals(value1, value2) {
    return value1 === value2
  }

  static parse(value) {
    return value
  }

  static toJSON(value) {
    return value
  }
}
  .define({
    name: 'primitive',
  })