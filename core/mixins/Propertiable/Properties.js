const Tree = require('../../types/Tree')
const Mixin = require('../../Mixin')
module.exports = class Properties extends Tree {
  constructor(propertiable) {
    super()
    this.propertiable = propertiable
    this.isMixin = propertiable instanceof Mixin
    propertiable.definition.parents
      .filter((p) => p.properties)
      .forEach((parent) => {
        this.push(parent.properties)
      })
  }

  call(...args) {
    super.call(...args)
    return this.propertiable
  }

  defineProperty(property) {
    this.propertiable.defineProperty(property)
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Properties) {
        if (arg.isMixin && !this.isMixin) {
          arg.forEach((property) => {
            this.defineProperty(property)
          })
        }
        super.push(arg)
        return
      }
      if (typeof arg === 'object') {
        Object.entries(arg)
          .forEach(([name, property]) => {
            if (typeof property !== 'object') {
              property = {
                type: property,
              }
            }
            property.name = name
            super.push(property)
            if (!this.isMixin) {
              this.defineProperty(property)
            }
            this.propertiable.sanitizeProperty(property)
          })
        return
      }
      throw new Error(`Property type not recognized`)
    })
  }
}