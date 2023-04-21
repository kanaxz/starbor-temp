const ManufacturerItem = require('./ManufacturerItem')
const Slot = require('./Slot')
const ShipComponent = require('./ShipComponent')

module.exports = class Ship extends ManufacturerItem {

}
  .define({
    name: 'ship',
  })
  .properties({
    slots: [Slot]
  })