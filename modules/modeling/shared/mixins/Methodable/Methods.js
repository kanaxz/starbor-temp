const Tree = require('core/types/Tree')
module.exports = class Methods extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.methods)
      .forEach((parent) => {
        this.push(parent.methods)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Methods) {
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
          })
        return
      }
      throw new Error('Method type not recognized')
    })
  }
}