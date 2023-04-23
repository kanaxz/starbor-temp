const Tree = require('../../../types/Tree')
const Mixin = require('../../../Mixin')
module.exports = class Methods extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    this.isMixin = owner instanceof Mixin
    owner.definition.parents.forEach((parent) => {
      this.push(parent.methods)
    })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  defineMethod(property) {
    this.owner.defineProperty(property)
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Methods) {
        if (arg.isMixin && !this.isMixin) {
          arg.forEach((method) => {
            this.defineMethod(method)
          })
        }
        super.push(arg)
        return
      }
      if (typeof arg === 'object') {
        Object.entries(arg)
          .forEach(([name, method]) => {
            if (Array.isArray(method)) {
              method = {
                args: method[0],
                returnType: method[1],
              }
            }
            method.args = method.args.map((arg) => {
              if (arg.type) {
                return arg
              }
              return {
                type: arg,
              }
            })
            method.name = name
            super.push(method)
            if (!this.isMixin) {
              this.defineMethod(method)
            }
          })
        return
      }
      throw new Error('Method type not recognized')
    })
  }
}