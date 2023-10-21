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

  static takeControl() {
    this.doesTakeControl = true
    return this
  }

  attach(scope) {
    super.attach(scope)
    return this.constructor.doesTakeControl
  }

  destroy() {
    console.warn('virtual destroyed', this)
    super.destroy()
  }

  constructor(el) {
    super()
    this.el = el
  }
}
