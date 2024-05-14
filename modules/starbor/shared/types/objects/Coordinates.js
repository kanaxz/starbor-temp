
const { Number } = require('modeling/types')
const Position = require('./Position')

module.exports = class Coordinates extends Position {

}
  .define({
    name: 'coordinates',
  })
  .properties({
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
  })