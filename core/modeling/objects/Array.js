const Array = require('../../types/Array')
const mixer = require('../../mixer')
const utils = require('../utils')
const Any = require('../Any')

class ObjectArray extends mixer.extends(Array, [Any]) {
  static build(json, property) {
    const result = json.map((object) => {
      return this.template.build(object, property)
    })
    const array = new this(...result)
    return array
  }

  toJSON(property) {
    const result = [...this.map((object) => {
      return this.constructor.template.toJSON(object, property)
    })]
    return result
  }
}

ObjectArray
  .define({
    name: 'array',
  })

utils.propertySanitizers.push((property) => {
  if (!Array.isArray(property.type)) { return }
  property.type = ObjectArray.of(property.type[0])
})

module.exports = ObjectArray

