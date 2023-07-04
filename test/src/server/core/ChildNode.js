const Branch = require('core/modeling/types/Branch')
const Node = require('./Node')
const { String } = require('core/modeling/types')

module.exports = class Child extends Node {

}
  .define({
    name: 'child',
  })
  .properties({
    name: String
  })