const Destroyable = require('../../mixins/Destroyable')
const mixer = require('../../mixer')
const Propertiable = require('../../mixins/Propertiable')
const typeKey = '@type'

module.exports = mixer.mixin([Destroyable, Propertiable], (base) => {
  return class Buildable extends base {

    constructor(values = {}) {
      super()
      // disable the possibility to assign @type on buildables
      // we don't want to throw an error
      Object.defineProperty(this, '@type', { get() { }, set() { } })
      this.constructor.properties.forEach((property) => {
        let value = values[property.name]
        if (value === undefined) {
          value = null
        }
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

      if (!type) {
        throw new Error(`Type ${typeName} not find from ${this.definition.name}`)
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
      if (parsedValue === undefined) { return }

      super.setPropertyValue(property, parsedValue)
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