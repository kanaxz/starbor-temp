const Primitive = require('./Primitive')
const Model = require('../Model')
const utils = require('../utils')

class Bool extends Primitive {
  static validate(value) {
    return typeof value === 'boolean'
  }
}

Primitive.methods({
  eq: [[THIS], Bool]
})

utils.propertySanitizers.push((property) => {
  if (property.type === 'bool') {
    property.type = Bool
  }
})

module.exports = Bool