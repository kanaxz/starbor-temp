const Primitive = require('./Primitive')
const Model = require('../Model')
const Any = require('../Any')
const utils = require('../utils')

class Bool extends Primitive {
  static validate(value) {
    return typeof value === 'boolean'
  }
}

Bool.define({
  name: 'bool',
})

Any.methods({
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