const Destroyable = require('../../mixins/Destroyable')
const mixer = require('../../mixer')
const Propertiable = require('../../mixins/Propertiable')
const Holder = require('../../mixins/Holder')
const typeKey = '@type'

module.exports = mixer.mixin([Destroyable, Propertiable, Holder], (base) => {
  return class Buildable extends base {

    constructor(values = {}) {
      super()
      this.constructor.properties.forEach((property) => {
        const value = values[property.name]
        this[property.name] = value
      })
    }


    static parse(object) {
      if (object == null || object instanceof this) {
        return object
      }
      const typeName = object[typeKey]
      let type = this
      if (typeName && this.definition.name !== typeName) {
        type = this.findChild((c) => c.definition.name === typeName)
      }
      try {
        const instance = new type(object)

        return instance
      } catch (err) {
        console.log(object, type, typeName, this.name)
        throw err
      }
    }


    static toJSON(value, context, paths) {
      return value && value.toJSON(context, paths)
    }

    async setPropertyValue(property, value) {
      const parsedValue = property.type.parse(value, this, property)
      if (parsedValue !== undefined) {
        super.setPropertyValue(property, parsedValue)
      }
    }

    toJSON(context = null, paths = {}) {
      const values = Object.entries(this[Propertiable.symbol])
        .reduce((acc, [k, v]) => {
          const property = this.constructor.properties.find((p) => p.name === k)
          if (!property || (property.context && property.context !== context)) {
            return acc
          }
          const result = property.type.toJSON(v, context, paths && paths[property.name] || null)
          if (result !== undefined) {
            acc[property.name] = result
          }
          return acc
        }, {})

      return {
        '@type': this.constructor.definition.name,
        ...values,
      }
    }
  }
})