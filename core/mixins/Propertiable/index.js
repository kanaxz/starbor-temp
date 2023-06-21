const mixer = require("../../mixer");
const Destroyable = require("../Destroyable")
const Eventable = require('../Eventable')
const Initializeable = require('../Initializeable')
const Properties = require('./Properties')

const mixin = mixer.mixin([Eventable, Initializeable, Destroyable], (base) => {
  return class Propertiable extends base {
    static sanitizeProperty(property) {

    }

    defineProperty(property) {
      Object.defineProperty(this, property.name, {
        get: function () {
          return this.values[property.name]
        },
        set: function (newValue) {
          this.setPropertyValue(property, newValue)
        },
        enumerable: true,
      })
    }

    static define(definition) {
      super.define(definition)
      this.properties = new Properties(this)
      return this
    }

    constructor(...args) {
      super(...args)
      const properties = this.constructor.properties
      if (properties) {
        properties.forEach((p) => this.defineProperty(p))
      }

      Object.defineProperty(this, 'values', { enumerable: false, writable: true, value: {} })
    }

    propertyChanged(property, value, oldValue) {
      this.emit('propertyChanged', property, value, oldValue)
      this.emit(`propertyChanged:${property.name}`, value, oldValue)
    }

    setPropertyValue(property, value) {
      if (!this.values) {
        this.values = {}
      }
      const oldValue = this.values[property.name]
      this.values[property.name] = value
      this.propertyChanged(property, value, oldValue)
    }

    destroy() {
      super.destroy()
      this.constructor.properties.forEach((p) => {
        this[p.name] = null
      })
    }
  }
})

module.exports = mixin