const mixer = require('../mixer')
const Propertiable = require('../Propertiable')

const Buildable = require('./mixins/Buildable')
const Templateable = require('./mixins/Templateable')
const utils = require('./utils')
const owner = Symbol('owner')

module.exports = mixer.proxy([Propertiable(), Buildable(), Templateable()], (base) => {
  return class Base extends base {



    static methods(methods) {
      methods = Object
        .entries(methods)
        .reduce((acc, [name, [args, returnType]]) => {
          acc[name] = {
            name,
            args,
            returnType,
          }
          return acc
        }, {})
      if (this._methods && this._methods[owner] === this) {
        Object.assign(this._methods, methods)
      } else {
        this._methods = {
          __proto__: (this._methods || {}),
          [owner]: this,
          ...methods
        }
      }
      return this
    }

    static sanitizeProperty(property) {
      utils.propertySanitizers.forEach((sanitizer) => sanitizer(property))
    }

    constructor(...args) {
      super(...args)
      this.initialize()
    }
  }
}) 
