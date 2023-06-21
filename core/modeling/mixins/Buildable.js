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


    static parse(object, owner, property) {
      if (object == null || object instanceof this) {
        return object
      }
      const typeName = object[typeKey]
      let type = this
      if (typeName && this.definition.name !== typeName) {
        type = this.findChild((c) => c.definition.name === typeName)
      }
      if (type.definition.abstract) {
        console.trace('parsing', type.definition.name, object, owner, property)
      }

      try {
        const instance = new type(object)

        return instance
      } catch (err) {
        console.error(object, type, typeName, this.name)
        throw err
      }
    }


    static toJSON(value, paths, context) {
      return value && value.toJSON(paths, context)
    }

    setPropertyValue(property, value) {
      const parsedValue = property.type.parse(value, this, property)
      if (parsedValue !== undefined) {
        super.setPropertyValue(property, parsedValue)
      }
    }

    toJSON(paths = {}, context = null) {
      const values = Object.entries(this)
        .reduce((acc, [k, v]) => {
          const property = this.constructor.properties.find((p) => p.name === k)
          if (!property || (property.context && property.context !== context)) {
            return acc
          }
          const result = property.type.toJSON(v, paths && paths[property.name] || null, context)
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