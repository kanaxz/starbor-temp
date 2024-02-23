const mixer = require('core/mixer')
const BaseHoldable = require('./BaseHoldable')

module.exports = mixer.mixin((base) => {
  return class ArrayHolder extends base {
    changed() {
      if (this.copy) {
        this.copy.forEach((o) => {
          if (mixer.is(o, BaseHoldable)) {
            o.release(this)
          }
        })
      }
      this.copy = [...this]
      this.copy.forEach((o) => {
        if (mixer.is(o, BaseHoldable)) {
          o.hold(this)
        }
      })
      return super.changed()
    }
  }
})
