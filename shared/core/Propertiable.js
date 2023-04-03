const mixer = require("./mixer");
const Eventable = require('./Eventable')
const values = Symbol('values')

const convertArrayToObject = (arrayProperties) => {
  return arrayProperties.reduce((acc, p) => {
    acc[p] = { type: 'any' }
    return acc
  }, {})
}

console.log(values)
const mixin = mixer.mixin([Eventable()], (base) => {
  return class Propertiable extends base {
    static valuesSymbol = values

    static properties(newProperties) {
      this._properties = [this._properties || {}, newProperties]
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
        Object.defineProperty(this.prototype, property.name, {
          get: function () {
            return this[values][property.name]
          },
          set: function (newValue) {
            this.setPropertyValue(property, newValue)
          }
        })
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
      const oldValue = this[values][property.name]
      this[values][property.name] = value
      await this.emit('propertyChanged', value, oldValue)
      await this.emit(`propertyChanged:${property.name}`, value, oldValue)
    }
  }
})

mixin.symbol = values

module.exports = mixin