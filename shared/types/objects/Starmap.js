const { Object, Number, String } = require('modeling/types')
const Position3D = require('./Position3D')

module.exports = class Starmap extends Object {

}
  .define({
    name: 'Starmap',
  })
  .properties({
    id: Number,
    type: String,
    code: String,
    position: {
      type: Position3D,
      dimensionState: {
        step: 0.0000001,
      }
    },
    orbitPeriod: {
      type: Number,
      state: {
        step: 0.01,
      }
    },
  })