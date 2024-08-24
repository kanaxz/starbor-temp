const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')

module.exports = mixer.mixin([Propertiable],(base) => {
  return class Positionable extends base { }
})
  .define()
