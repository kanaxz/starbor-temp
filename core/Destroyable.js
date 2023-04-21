const mixer = require('./mixer')
const Eventable = require('./Eventable')

const destroyed = Symbol('destroyed')
module.exports = mixer.mixin([Eventable()], (base) => {
  return class Destroyable extends base {

    constructor(...args) {
      super(...args)
      this[destroyed] = false
    }

    destroy() {
      this[destroyed] = true
      this.emit('destroyed')
    }
  }
})