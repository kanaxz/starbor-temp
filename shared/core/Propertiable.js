const mixer = require("./mixer");
const Eventable = require('./Eventable')
const values = Symbol('values')
const Initializeable = require('./Initializeable')
const proto = require('./proto')

const convertArrayToObject = (arrayProperties) => {
  return arrayProperties.reduce((acc, p) => {
    acc[p] = { type: 'any' }
    return acc
  }, {})
}

const mixin = mixer.mixin([Eventable(), Initializeable()], (base) => {
  return class Propertiable extends base {
    static valuesSymbol = values

    static sanitizeProperty(propert) {

    }

    static properties(newProperties) {

      if (Array.isArray(newProperties)) {
        newProperties = convertArrayToObject(newProperties)
      }

      for (let [name, property] of Object.entries(newProperties)) {
        if (typeof property !== 'object') {
          property = {
            type: property,
          }
          newProperties[name] = property
        }

        property.name = name
        this.sanitizeProperty(property)
        Object.defineProperty(this.prototype, property.name, {
          get: function () {
            return this[values][property.name]
          },
          set: function (newValue) {
            this.setPropertyValue(property, newValue)
          }
        })
      }

      this._properties = {
        __proto__: this._properties,
        ...newProperties
      }
      return this
    }

    get properties() {
      return this.constructor._properties
    }

    constructor(...args) {
      super(...args)
      this[values] = {}
    }

    async setPropertyValue(property, value) {
      if (!this[values]) {
        this[values] = {}
      }
      const oldValue = this[values][property.name]
      this[values][property.name] = value
      if (!this.isInitialized) { return }
      await this.emit('propertyChanged', value, oldValue)
      await this.emit(`propertyChanged:${property.name}`, value, oldValue)
    }
  }
})

mixin.symbol = values

module.exports = mixin