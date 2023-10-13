const Controlleable = require('modeling/controlling/Controlleable')
const mixer = require('core/mixer')
const context = require('hedera/context')

const mixin = mixer.mixin([Controlleable], (base) => {
  return class ClientControlleable extends base {
    canUpdate() {
      return super.canUpdate(context)
    }

    canDelete() {
      return super.canDelete(context)
    }
  }
})

module.exports = mixin