const Location = require('./Location')
const EuclideanSpace = require('./EuclideanSpace')
class GroundPosition {

}

module.exports = class GroundLocation extends EuclideanSpace {

}
  .properties({
    position: GroundPosition,
  })
  .define({
    name: 'groundLocation',
    pluralName: 'groundLocations'
  })