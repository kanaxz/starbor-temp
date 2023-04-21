const Planet = require('./Planet')
const GroundLocation = require('./GroundLocation')
module.exports = class City extends GroundLocation {

}
  .properties({
    parent: Planet,
  })
  .define({
    name: 'city',
    pluralName: 'cities'
  })