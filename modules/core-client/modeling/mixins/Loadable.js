const mixer = require('core/mixer')
const Context = require('../Context')

module.exports = mixer.mixin((base) => {
  return class Loadable extends base {
    load(...args) {
      return super.load(new Context(), ...args)
    }
  }
})

