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


  preventRender() {
    return false
  }

  attach(scope) {
    super.attach(scope)
    return this.preventRender()
  }

  constructor(el) {
    super()
    this.el = el
  }
}
