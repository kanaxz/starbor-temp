const ExtensibleFunction = require('./ExtensibleFunction')
module.exports = class Event extends ExtensibleFunction {
  constructor(options = {}) {
    super((...args) => this.listen(...args))
    this.options = options
    this.listeners = []
  }

  listen(listener) {
    this.listeners.push(listener)
  }

  async trigger(...args) {
    for (const listener of this.listeners) {
      await listener(...args)
    }
  }
}
