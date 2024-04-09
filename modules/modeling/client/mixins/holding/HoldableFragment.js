const mixer = require('core/mixer')
const BaseHoldable = require('./BaseHoldable')

module.exports = mixer.mixin([BaseHoldable], (base) => {
  return class HoldableFragment extends base {
    hold(reference) {
      this.owner.hold(reference)
    }

    release(reference) {
      this.owner.release(reference)
    }
  }
})
  .define()
