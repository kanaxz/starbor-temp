const mixer = require('../../../shared/mixer')
const Holdable = require('./Holdable')

module.exports = mixer.mixin((base) => {
  return class ArrayHolder extends base {
    indexDeleted(index, value) {
      if (mixer.is(value, Holdable)) {
        value.release(this)
      }
      return super.indexDeleted(index, value)
    }

    indexSet(index, value, oldValue) {
      if (oldValue && mixer.is(oldValue, Holdable)) {
        oldValue.release(this)
      }
      if (value && mixer.is(value, Holdable)) {
        value.hold(this)
      }
      return super.indexSet(index, value, oldValue)
    }
  }
})
