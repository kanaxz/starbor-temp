const { typeOf } = require('../../core/modeling/utils')
const Type = require('../../core/modeling/Type')
const ShipComponent = require('./ShipComponent')
const { String } = require('core/modeling/types')

module.exports = class Slot extends Type.of(ShipComponent) {

}
  .properties({
    name: String,
    size: 'number',
  })