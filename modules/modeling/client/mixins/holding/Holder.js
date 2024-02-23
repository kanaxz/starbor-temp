const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const BaseHoldable  = require('./BaseHoldable')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Holder extends base {
    propertyChanged(property, value, oldValue) {
      if (oldValue && mixer.is(oldValue, BaseHoldable )) {
        oldValue.release(this)
      }
      if (value && mixer.is(value, BaseHoldable)) {
        value.hold(this)
      }
      return super.propertyChanged(property, value, oldValue)
    }
  }
})
