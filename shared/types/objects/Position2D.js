const { Object, Number } = require('core/modeling/types')

module.exports = class Position2D extends Object {

}
  .define({
    name: 'position2D',
  })
  .properties({
    x: Number,
    y: Number,
  })