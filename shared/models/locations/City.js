const Planet = require('./Planet')
const GroundLocation = require('./GroundLocation')
module.exports = class City extends GroundLocation {

}
  .define({
    name: 'city',
    pluralName: 'cities'
  })
  .properties({
    parent: Planet,
  })
