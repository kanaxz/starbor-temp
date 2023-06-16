const BaseArray = require('../../types/Array')
const mixer = require('../../mixer')
const utils = require('../utils')
const Any = require('../Any')
const Bool = require('./Bool')
const Function = require('./Function')
const Template = require('./Template')
const Holdable = require('../../mixins/Holdable')

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

  indexDeleted(index, value) {
    if (mixer.is(value, Holdable)) {
      value.release(this)
    }
    return super.indexDeleted(index, value)
  }

  setIndex(index, value) {

    value = this.constructor.definition.template.parse(value)
    super.setIndex(index, value)
  }

  indexSet(index, value, oldValue) {
    if (oldValue && mixer.is(oldValue, Holdable)) {
      oldValue.release(this)
    }
    if (value && mixer.is(value, Holdable)) {
      value.hold(this)
    }
    return super.indexSet(index, value, oldValue)
  }

  toJSON(context, paths) {
    const result = [...this].map((object) => {
      return this.constructor.definition.template.toJSON(object, context, paths)
    })
    return result
  }

  destroy() {
    this.length = 0
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

