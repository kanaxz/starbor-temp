const Primitive = require('./Primitive')
const utils = require('../utils')
const Real = require('../Real')

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
  eq: [[THIS], Bool],
  neq: [[THIS], Bool]
})


utils.propertySanitizers.push((property) => {
  if (property.type === 'bool') {
    property.type = Bool
  }
})

module.exports = Bool