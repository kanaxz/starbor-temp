const mixer = require("../../mixer");
const Destroyable = require("../Destroyable");
const Eventable = require('../Eventable')
const values = Symbol('values')
const Initializeable = require('../Initializeable')
const Properties = require('./Properties')

const mixin = mixer.mixin([Eventable, Initializeable, Destroyable], (base) => {
  return class Propertiable extends base {
    static sanitizeProperty(property) {

    }

    static defineProperty(property) {
      Object.defineProperty(this.prototype, property.name, {
        get: function () {
          return this[values][property.name]
        },
        set: function (newValue) {
          this.setPropertyValue(property, newValue)
        },
      })
    }

    static define(definition) {
      super.define(definition)
      this.properties = new Properties(this)
      return this
    }

    constructor(...args) {
      super(...args)
      this[values] = {}
    }

    async propertyChanged(property, value, oldValue) {
      await this.emit('propertyChanged', property, value, oldValue)
      await this.emit(`propertyChanged:${property.name}`, value, oldValue)
    }

    async setPropertyValue(property, value) {
      if (!this[values]) {
        this[values] = {}
      }
      const oldValue = this[values][property.name]
      this[values][property.name] = value
      if (!this.isInitialized) { return }
      await this.propertyChanged(property, value, oldValue)
    }

    destroy() {
      this.constructor.properties.forEach((p) => {
        this[p.name] = null
      })
      super.destroy()
    }
  }
})

mixin.symbol = values

module.exports = mixin