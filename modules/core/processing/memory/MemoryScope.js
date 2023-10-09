const Scope = require("../Scope");
const handlers = require('./handlers')
const setup = require('../../setup')

class MemoryScope extends Scope {
  constructor(...args) {
    super(...args)
    this.handlers = handlers
  }
  async load(path) {
    await this.variables.this.value.load(path)
  }
}

setup.MemoryScope = MemoryScope

module.exports = MemoryScope