const Missile = require('./Missile')
const ShipComponent = require('./ShipComponent')

module.exports = class MissilesRack extends ShipComponent {

}
  .define({
    name: 'missilesRack',
  })
  .properties({
    slots: [Slot.of(Missile)]
  })