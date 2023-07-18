const BaseArray = require('../../types/Array')
const mixer = require('../../mixer')
const utils = require('../utils')
const Any = require('./Any')
const Bool = require('./Bool')
const Function = require('./Function')
const Template = require('./Template')

const template = Template.of(Any)

class Array extends mixer.extends(BaseArray, [Any]) {

  static parse(object, owner, property) {
    if (!object) {
      return object
    }
    let array
    if (object instanceof this) {
      array = object
    } else {
      array = new this()
      array.push(...object)
    }

    return array
  }

  static equals(a1, a2) {
    if (a1.constructor !== a2.constructor) { return false }
    if (a1.length !== a2.length) { return false }

    const type = this.definition.template
    for (let i = 0; i < a1.length; i++) {
      if (!type.equals(a1[i], a2[i])) {
        return false
      }
    }
    return true
  }



  setIndex(index, value) {

    value = this.constructor.definition.template.parse(value)
    super.setIndex(index, value)
  }



  toJSON(paths, context) {
    const result = [...this].map((object) => {
      return this.constructor.definition.template.toJSON(object, paths, context)
    })
    return result
  }

  destroy() {
    this.splice(0, this.length)
    super.destroy()
  }
}

const fnArg = { type: Function, args: [template] }


Array
  .define({
    name: 'array',
    template,
  })
  .methods({
    find: [[fnArg], template],
    has: [[template], Bool],
    any: [[fnArg], Bool],
  })

utils.propertySanitizers.push((property) => {
  if (!Array.isArray(property.type)) { return }
  property.type = Array.of(property.type[0])
})

module.exports = Array

