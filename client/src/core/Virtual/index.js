const { virtuals } = require('./worker')
const mixer = require('@shared/core/mixer')
const Base = require('../Base')

module.exports = class Virtual extends mixer.extends([Base()]) {

  static define(definition) {
    if (definition.name) {
      virtuals.push(this)
    }
    return super.define(definition)
  }

  get el() {
    return this._el
  }

  constructor(_el) {
    super()
    this._el = _el
  }
}
