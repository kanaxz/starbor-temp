const Primitive = require('./Primitive')
const utils = require('../utils')

class Number extends Primitive {
  static validate(value) {
    return typeof value === 'number'
  }
}

utils.propertySanitizers.push((property) => {
  if (property.type === 'number') {
    property.type = Number
  }
})

module.exports = Number