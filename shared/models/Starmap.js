const Object = require('core/modeling/Object')
const Position2D = require('./Position3D')

module.exports = class Starmap extends Object {

}
  .define({
    name: 'Starmap',
  })
  .properties({
    id: 'string',
    type: 'string',
    //position: Position2D,
    orbitPeriod: 'number',
  })