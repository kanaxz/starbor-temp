const Primitive = require('./Primitive')
const utils = require('../utils')
const Bool = require('./Bool')
const Object = require('./Object')

class String extends Primitive {
  static parse(value, owner, property) {
    if (value == null) { return value }

    if (typeof value !== 'string') {
      throw new Error(`Property ${property.name} has to be a string, received ${value}`)
    }
    if (property.values && property.values.indexOf(value) === -1) {
      throw new Error(`Property ${property.name} with value ${value} does not match values: ${property.values.join(',')}`)
    }
    return super.parse(value, owner, property)
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

Object.properties({
  '@type': String
})


module.exports = String