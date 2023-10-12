const mixer = require('../../shared/mixer')
const Bindeable = require('../../shared/mixins/Bindeable')
const Destroyable = require('../../shared/mixins/Destroyable')

module.exports = mixer.mixin([Bindeable, Destroyable], (base) => {
  return class Interactable extends base {
    constructor(...args) {
      super(...args)
      this.listeners = []
    }

    listen(el, event, callback, options) {
      el.addEventListener(event, this.b(callback), options)
      this.listeners.push({ el, event, callback })
    }

    stopListen(el, event, callback) {
      const index = this.listeners.findIndex((l) => {
        return l.el === el && l.event === event && l.callback === callback
      })
      if (index === -1) { return }

      el.removeEventListener(event, this.b(callback))
      this.listeners.splice(index, 1)
    }

    destroy() {
      super.destroy()
      this.listeners.forEach(({ el, event, callback }) => {
        el.removeEventListener(event, this.b(callback))
      })
    }
  }
})