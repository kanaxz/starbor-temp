const Destroyable = require('../../mixins/Destroyable')
const mixer = require('../../mixer')
const Propertiable = require('../../mixins/Propertiable')
const Holdable = require('../../mixins/Holdable')
const objectUtility = require('../../utils/object')

module.exports = mixer.mixin([Destroyable, Propertiable, Holdable], (base) => {
  return class Buildable extends base {

    static getBranch() {
      const branch = []
      let current = this
      while (current) {
        branch.push(current)
        current = current.parent
      }
      return branch
    }

    static buildable(buildOptions) {
      this.buildOptions = buildOptions
    }

    static build(json, property) {
      const typeName = json['@type']
      delete json['@type']
      let type
      if (this.definition.name === typeName) {
        type = this
      } else {
        type = this.findChild((c) => c.definition.name === typeName)
      }
      if (!type) {
        type = this
        //throw new Error(`Type ${typeName} not found`)
      }
      const instance = new type()
      //console.log(json, type)
      const values = type.properties.reduce((acc, property) => {
        const jsonValue = json[property.name]
        if (jsonValue === undefined) { return acc }
        //console.log(property.type)
        const value = property.type.build(jsonValue, property)
        acc[property.name] = value
        if (mixer.is(value, Holdable)) {
          value.hold(instance)
        }
        return acc
      }, {})


      Object.assign(instance, values)
      return instance
    }

    static toJSON(value, property) {
      return value.toJSON(property)
    }


    toJSON(property) {
      const json = this.constructor.properties.reduce((acc, property) => {
        const value = this[property.name]
        acc[property.name] = property.type.toJSON(value, property)
        return acc
      }, {})
      return json
    }

    destroy() {
      console.log('destroying')
      this.constructor.properties.forEach((property) => {
        const value = this[property.name]
        if (value && mixer.is(value, Holdable)) {
          value.release(this)
        }
      })
      return super.destroy()
    }
  }
})