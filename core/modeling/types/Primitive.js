const mixer = require('../../mixer')
const Any = require('../Any')

module.exports = class Primitive extends mixer.extends([Any]) {
  constructor() {
    throw new Error('Cannot instenciate')
  }

  static build(value) {
    return value
  }

  static toJSON(value) {
    return value
  }
}
  .define({
    name: 'primitive',
  })