const Location = require('./Location')
const EuclideanSpace = require('./EuclideanSpace')
class GroundPosition {

}

module.exports = class GroundLocation extends EuclideanSpace {

}
  .define({
    name: 'groundLocation',
    pluralName: 'groundLocations'
  })
  .properties({
    position: GroundPosition,
  })
