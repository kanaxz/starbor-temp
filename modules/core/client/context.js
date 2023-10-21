const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')

class Context extends mixer.extends([Propertiable]) {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }
}
const context = new Context()

module.exports = context