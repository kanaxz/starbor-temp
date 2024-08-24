const mixer = require('../../core/mixer')
const Manufacturable = require('./ManufacturerItem')

module.exports = class Missile extends mixer.extends([Manufacturable()]) {

}
  .define({
    name: 'missile',
    pluralName: 'missiles',
  })
  .properties({

  })