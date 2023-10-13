const Destroyable = require('core/mixins/Destroyable')
const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const typeKey = '@type'

const ignore = {}

const Buildable = mixer.mixin([Destroyable, Propertiable], (base) => {
  return class extends base {

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

    static onObjectParsed(object) { }

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
      try {
        const instance = new type()
        this.onObjectParsed(instance)
        Object.assign(instance, object)
        return instance
      } catch (err) {
        throw err
      }
    }

    equals(object){
      return this.constructor.equals(this, object)
    }


    static toJSON(value, paths, context) {
      return value && value.toJSON(paths, context)
    }

    setPropertyValue(property, value) {
      if (!property.type.parse) {
        console.log(property)
      }
      const parsedValue = property.type.parse(value, this, property)
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

      return {
        '@type': this.constructor.definition.name,
        ...values,
      }
    }
  }
})

Buildable.ignore = ignore

module.exports = Buildable