const mixer = require('core/mixer')
const Branch = require('core/modeling/types/Branch')
const GameModel = require('../GameModel')
const Affiliation = require('../Affiliation')
const Searchable = require('core/modeling/mixins/Searchable')

class Location extends mixer.extends(GameModel, [Searchable]) {

}
console.log(Location.definition)
Location
  .define({
    name: 'location',
    pluralName: 'locations',
    searchField: 'name',
  })
  .properties({
    name: 'string',
    description: 'string',
    affiliation: Affiliation,
    parent: Location,
    parents: {
      type: Branch.of(Location),
      on: 'parent',
    },
  })


module.exports = Location
