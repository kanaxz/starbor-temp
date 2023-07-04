const Primitive = require('./Primitive')
const utils = require('../utils')
const Real = require('./Real')
const This = require('./This')

class Bool extends Primitive {


  static parse(value, owner, property) {
    if (value == null) { return value }
    if (typeof value !== 'boolean') {
      throw new Error(`Property ${property.name} has to be a bool, received ${value}`)
    }
    return super.parse(value, owner, property)
  }
}

Bool.define({
  name: 'bool',
})

Real.methods({
  not: [[], Bool]
})

Primitive.methods({
  eq: [[This], Bool],
  neq: [[This], Bool]
})


module.exports = Bool