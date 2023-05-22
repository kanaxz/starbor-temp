const BaseArray = require('../../types/Array')
const mixer = require('../../mixer')
const utils = require('../utils')
const Any = require('../Any')
const Bool = require('./Bool')
const Function = require('./Function')
const Template = require('./Template')

const template = Template.of(Any)

class Array extends mixer.extends(BaseArray, [Any]) {
  static build(json, property) {
    const result = json.map((object) => {
      return this.template.build(object, property)
    })
    const array = new this(...result)
    return array
  }

  toJSON(property) {
    const result = this.map((object) => {
      return this.constructor.template.toJSON(object, property)
    })
    return result
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

