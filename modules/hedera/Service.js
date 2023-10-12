const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')

module.exports = class Service extends mixer.extends([Propertiable]) {
  constructor(...args) {
    super(...args)
    if (this.instance) { throw new Error('Already instanciated') }
    this.instance = this
  }
}