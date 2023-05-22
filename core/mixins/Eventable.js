const mixer = require("../mixer")
const events = Symbol("events")
const otherEvents = Symbol("otherEvents")

class Listener {
  constructor(options) {
    Object.assign(this, options)
  }

  remove() {
    this.eventable.off(this)
  }
}


module.exports = mixer.mixin((baseClass) => {
  return class Eventable extends baseClass {
    constructor(...args) {
      super(...args)
      this[events] = {}
      this[otherEvents] = []
    }

    on(...args) {
      if (args.length === 3) {
        const [source, eventName, callback] = args
        const listener = source.on(eventName, callback)
        this[otherEvents].push(listener)
        return listener
      } else {
        const [eventName, callback] = args
        const listener = new Listener({
          eventable: this,
          eventName,
          callback,
        })
        if (!this[events][eventName]) {
          this[events][eventName] = []
        }
        this[events][eventName].push(listener)
        return listener
      }
    }

    async emit(eventName, ...args) {
      const event = this[events][eventName]
      if (!event) { return }
      const listeners = [...event]
      for (const listener of listeners) {
        await listener.callback(...args)
      }
    }

    off(listener) {
      const event = this[events][listener.eventName]
      if (!event) { return }

      const index = event.indexOf(listener)
      if (index === -1) { return }

      event.splice(index, 1)
    }

    destructor() {
      Object.values(events)
        .forEach((event) => {
          event.forEach((listener) => {
            listener.remove()
          })
        })

      this[otherEvents].forEach((listener) => listener.remove())
    }
  }
})