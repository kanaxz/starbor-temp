const mixer = require('core/mixer')

module.exports = mixer.mixin((base) => {
  return class Holdable extends base {
    hold(reference) {
      throw new Error('Not implemented')
    }
    
    release(reference) {
      throw new Error('Not implemented')
    }
  }
})
