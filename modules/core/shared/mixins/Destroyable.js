const mixer = require('../mixer')
const Eventable = require('./Eventable')
const destroyed = Symbol('destroyed')

const Destroyable = mixer.mixin([Eventable], (base) => {
  return class Destroyable extends base {

    constructor(...args) {
      super(...args)
      Object.defineProperty(this, destroyed, {
        enumerable: false,
        writable: true,
        value: false
      })
    }

    destroy() {
      if (this[destroyed]) {
        console.error(this)
        throw new Error('Already destroyed')
      }
      this[destroyed] = true
      this.emit('destroyed')
    }
  }
})

Destroyable.symbol = destroyed

module.exports = Destroyable