const Controlleable = require('core/modeling/controlling/Controlleable')
const mixer = require('core/mixer')

const mixin = mixer.mixin([Controlleable], (base) => {
  return class ClientControlleable extends base {
    canUpdate() {
      return super.canUpdate(mixin.auth.me)
    }

    canDelete() {
      return super.canDelete(mixin.auth.me)
    }
  }
})

module.exports = mixin
