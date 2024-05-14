const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')

module.exports = mixer.mixin([Propertiable],(base) => {
  return class Positionable extends base { }
})
  .define()
