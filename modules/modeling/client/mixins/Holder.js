const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Holdable = require('./Holdable')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Holder extends base {
    propertyChanged(property, value, oldValue) {

      if (oldValue && mixer.is(oldValue, Holdable)) {
        oldValue.release(this)
      }
      if (value && mixer.is(value, Holdable)) {
        value.hold(this)
      }
      return super.propertyChanged(property, value, oldValue)
    }
  }
})
