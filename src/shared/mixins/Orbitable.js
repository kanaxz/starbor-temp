const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')
const Orbit = require('../types/objects/Orbit')
const Positionable = require('./Positionable')

module.exports = mixer.mixin([Propertiable, Positionable], (base) => {
  return class Orbitable extends base {

  }
})
  .define()
  .properties({
    position: {
      type: Orbit,
    }
  })
