const Primitive = require('./Primitive')
const utils = require('../utils')
const Bool = require('./Bool')

class String extends Primitive {
  static validate(value) {
    return typeof value === 'string'
  }
}

String
  .define({
    name: 'string',
  })
  .methods({
    match: [[String], Bool],
    toUpperCase: [[], String]
  })


utils.propertySanitizers.push((property) => {
  if (property.type === 'string') {
    property.type = String
  }
})

module.exports = String