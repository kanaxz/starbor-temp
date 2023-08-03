const { Object, Number, String } = require('core/modeling/types')
const Position2D = require('./Position3D')

module.exports = class Starmap extends Object {

}
  .define({
    name: 'Starmap',
  })
  .properties({
    id: Number,
    type: String,
    code: String,
    position: Position2D,
    orbitPeriod: Number,
  })