const mixer = require('core/mixer')
const BaseHoldable = require('./BaseHoldable')

module.exports = mixer.mixin([BaseHoldable], (base) => {
  return class HoldableFragment extends base {
    hold(reference) {
      if(!this.owner){
        console.log(this)
      }
      this.owner.hold(reference)
    }

    release(reference) {
      this.owner.release(reference)
    }
  }
})
  .define()
