const mixer = require("../../mixer");
const Destroyable = require("../Destroyable")
const Eventable = require('../Eventable')
const Properties = require('./Properties')

const mixin = mixer.mixin([Eventable, Destroyable], (base) => {
  return class Propertiable extends base {
    static sanitizeProperty(property) {

    }

    defineProperty(property) {
      Object.defineProperty(this, property.name, {
        get: function () {
          return this.values[property.name]
        },
        set: function (newValue) {
          //console.log('setting', property, newValue)
          if (this[Destroyable.symbol]) { return }
          if (newValue === this[property.name]) { return }
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
        try {
          properties.forEach((p) => this.defineProperty(p))
        } catch (err) {
          console.error(this, [...properties])
          throw err
        }
      } else {
        console.log('weird no props', this)
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
      this.constructor.properties.forEach((p) => {
        this[p.name] = null
      })
      super.destroy()
    }
  }
})

module.exports = mixin