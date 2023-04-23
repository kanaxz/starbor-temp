const mixer = require('core/mixer')
const GameModel = require('../GameModel')
const Affiliation = require('../Affiliation')

class Location extends GameModel {

}
Location
  .define({
    name: 'location',
    pluralName: 'locations',
  })
  .properties({
    name: 'string',
    description: 'string',
    affiliation: {
      type: Affiliation,
      identity: 'code',
    },
    //parent: Location,
    //parents: Branch.of(Location),
  })


module.exports = Location
