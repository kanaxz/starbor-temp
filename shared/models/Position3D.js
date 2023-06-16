const Position2D = require('./Position2D')

module.exports = class Position3D extends Position2D {

}
  .define({
    name: 'position3D',
  })
  .properties({
    z: 'number',
  })