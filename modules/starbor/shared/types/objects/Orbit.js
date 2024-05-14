
const { Number } = require('modeling/types')
const Position = require('./Position')

module.exports = class Orbit extends Position {

}
  .define({
    name: 'orbit',
  })
  .properties({
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
  })