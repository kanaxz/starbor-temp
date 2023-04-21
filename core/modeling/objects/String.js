const Primitive = require('./Primitive')
const utils = require('../utils')
const Object = require('../Object')
const Bool = require('./Bool')
const Model = require('../Model')

class String extends Primitive {
  static validate(value) {
    return typeof value === 'string'
  }
}

String.methods({
  match: [[String], Bool],
  toUpperCase: [[], String]
})

Object.methods({
  is: [[String], Bool]
})

Model.properties({
  _id: String,
})

utils.propertySanitizers.push((property) => {
  if (property.type === 'string') {
    property.type = String
  }
})

module.exports = String