const Tree = require('core/types/Tree')

module.exports = class Controllers extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.controllers)
      .forEach((parent) => {
        this.push(parent.controllers)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }
}