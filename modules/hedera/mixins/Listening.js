const mixer = require('core/mixer')
const Bindeable = require('core/mixins/Bindeable')
const Destroyable = require('core/mixins/Destroyable')

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

    destroy() {
      super.destroy()
      this.listeners.forEach(({ el, event, callback }) => {
        el.removeEventListener(event, this.b(callback))
      })
    }
  }
})