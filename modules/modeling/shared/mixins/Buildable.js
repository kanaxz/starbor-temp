const Destroyable = require('core/mixins/Destroyable')
const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Equalable = require('core/mixins/Equalable')
const typeKey = '@type'

const ignore = {}

const Buildable = mixer.mixin([Destroyable, Propertiable, Equalable], (base) => {
  return class extends base {

    constructor(values = {}, ...args) {
      super(...args)
      // disable the possibility to assign @type on buildables
      // we don't want to throw an error
      const undefinedValues = this.constructor.properties.reduce((acc, property) => {
        acc[property.name] = undefined
        return acc
      }, {})
      this.set({
        ...undefinedValues,
        ...values,
        '@type': this.constructor.definition.name,
      })
    }


    static parse(object, options, context) {
      if (object == null || object instanceof this) { return object }
      if (object.constructor?.hasMixin && object.constructor.hasMixin(this)) {
        return object
      }
      const typeName = object[typeKey]
      let type = this
      if (typeName && this.definition.name !== typeName) {
        type = this.findChild((c) => c.definition.name === typeName)
        if (!type) {
          throw new Error(`Type ${typeName} not find from ${this.definition.name}`)
        }
      }

      const instance = new type()
      instance.set(object, options)

      return instance
    }

    equals(object) {
      return this.constructor.equals(this, object)
    }

    static toJSON(value, paths, context) {
      return value && value.toJSON(paths, context)
    }

    setPropertyValue(property, value, options) {
      const parsedValue = property.type.parse(value, options, { owner: this, property })
      if (parsedValue === ignore) { return }

      super.setPropertyValue(property, parsedValue)
    }



    toJSON(paths = {}, context = null) {
      const values = Object.entries(this)
        .reduce((acc, [k, v]) => {
          const property = this.constructor.properties.find((p) => p.name === k)
          if (!property || (property.context !== undefined && property.context !== context)) {
            return acc
          }

          const result = property.type.toJSON(v, paths && paths[property.name] || null, context)
          if (result !== undefined) {
            acc[property.name] = result
          }
          return acc
        }, {})

      return values
    }
  }
})

Buildable.ignore = ignore

module.exports = Buildable