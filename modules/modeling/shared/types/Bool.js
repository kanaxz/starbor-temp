const Primitive = require('./Primitive')
const Real = require('./Real')
const This = require('./This')
const Array = require('./Array')

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
  neq: [[This], Bool],
  in: [[Array.of(This)], Bool]
})

Array.methods({
  has: [[Array.template], Bool],
  some: [[Array.fnArg], Bool],
})


module.exports = Bool