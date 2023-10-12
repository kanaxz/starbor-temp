const mixer = require('../../shared/mixer')
const Propertiable = require('../../shared/mixins/Propertiable')
const renderer = require('../renderer')

module.exports = class It extends mixer.extends([Propertiable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }

  destroy() {
    renderer.destroy(this.element)
    this.element.remove()
  }
}
  .define()
  .properties({
    index: 'number',
  })
