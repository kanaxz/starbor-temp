const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
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
