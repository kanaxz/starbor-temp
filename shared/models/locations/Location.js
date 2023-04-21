const mixer = require('core/mixer')
const GameModel = require('../GameModel')
const Affiliation = require('../Affiliation')

class Location extends GameModel {

}
Location
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
  .define({
    name: 'location',
    pluralName: 'locations',
  })

module.exports = Location
