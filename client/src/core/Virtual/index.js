const { virtuals } = require('./worker')
const mixer = require('core/mixer')
const Base = require('../Base')

module.exports = class Virtual extends mixer.extends([Base]) {

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
    //console.log('Virtual',this.constructor.name)
  }
}
