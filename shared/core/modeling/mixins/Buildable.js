const Destroyable = require('../../Destroyable')
const mixer = require('../../mixer')
const Propertiable = require('../../Propertiable')
const Holdable = require('../../Holdable')
const objectUtility = require('../../utils/object')

module.exports = mixer.mixin([Destroyable(), Propertiable(), Holdable()], (base) => {
  return class Buildable extends base {

    static define(definition) {
      this.definition = definition
      if (this.currentDefine) {
        this.currentDefine.childs.push(this)
        this.parent = this.currentDefine
      }
      this.childs = []

      this.currentDefine = this
      return this
    }


    static getBranch() {
      const branch = []
      let current = this
      while (current) {
        branch.push(current)
        current = current.parent
      }
      return branch
    }

    static findChild(check) {
      if (check(this)) {
        return this
      }
      for (const child of this.childs) {
        const subChild = child.findChild(check)
        if (subChild) {
          return subChild
        }
      }
      return null
    }

    static getAllChilds() {
      const childs = [this]
      for (const child of this.childs) {
        childs.push(...child.getAllChilds())
      }
      return childs
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
      const properties = objectUtility.values(type._properties)
      const values = properties.reduce((acc, property) => {
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
      const json = Object.values(this.constructor._properties)
        .reduce((acc, property) => {
          const value = this[property.name]
          acc[property.name] = property.type.toJSON(value, property)
          return acc
        }, {})
      return json
    }

    destroy() {
      console.log('destroying')
      const properties = objectUtility.values(this.constructor._properties)
      for (const property of properties) {
        const value = this[property.name]
        if (value && mixer.is(value, Holdable)) {
          value.release(this)
        }
      }
      return super.destroy()
    }
  }
})