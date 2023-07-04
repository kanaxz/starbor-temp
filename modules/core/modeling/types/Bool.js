const Primitive = require('./Primitive')
const utils = require('../utils')
const Real = require('./Real')
const This = require('./This')

class Bool extends Primitive {
  static validate(value) {
    return typeof value === 'boolean'
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


utils.propertySanitizers.push((property) => {
  if (property.type === 'bool') {
    property.type = Bool
  }
})

module.exports = Bool