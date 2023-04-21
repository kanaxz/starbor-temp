const Base = require('../Base')

module.exports = class Primitive extends Base {
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
  .methods({

  })