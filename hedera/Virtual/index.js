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

  static takeControl(){
    this.doesTakeControl = true
    return this
  }

  async attach(scope){
    await super.attach(scope)
    return this.constructor.doesTakeControl
  }

  constructor(el) {
    super()
    this.el = el
  }
}
