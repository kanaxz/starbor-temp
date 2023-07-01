const ExtensibleFunction = require('./ExtensibleFunction')
module.exports = class Event extends ExtensibleFunction {
  constructor() {
    super((...args) => this.listen(...args))
    this.listeners = []
  }

  listen(listener) {
    this.listeners.push(listener)
  }

  trigger(...args) {
    const results = this.listeners.map((l) => l(...args))
    return Promise.all(results)
  }
}
