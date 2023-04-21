const Item = require('./Item')
const Manufacturer = require('../Manufacturer')

module.exports = class ManufacturerItem extends Item {

}
  .properties({
    manufacturer: {
      type: Manufacturer,
      identity: 'name',
    },
  })