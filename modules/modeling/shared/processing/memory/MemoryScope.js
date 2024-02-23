const Scope = require('../Scope')
const handlers = require('./handlers')
const mixer = require('core/mixer')
const Loadable = require('../../mixins/Loadable')

class MemoryScope extends Scope {
  constructor(...args) {
    super(...args)
    this.handlers = handlers
  }
  async load(path) {
    await this.variables.this.value.load(path)
  }

  async innerGetProperty(property, source) {
    const value = source.value[property.name]
    if (mixer.is(property.type.prototype, Loadable)) {
      await source.value.load()
    }
    return value
  }
}

module.exports = MemoryScope