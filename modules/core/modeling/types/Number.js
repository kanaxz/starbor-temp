const Primitive = require('./Primitive')
const utils = require('../utils')

class Number extends Primitive {
  static parse(value, owner, property) {
    if (value == null) { return value }
    if (typeof value !== 'number') {
      throw new Error(`Property ${property.name} has to be a number, received ${value}`)
    }
    return super.parse(value, owner, property)
  }
}

module.exports = Number