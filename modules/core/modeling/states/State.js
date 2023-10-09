const Propertiable = require('../../mixins/Propertiable')
const mixer = require('../../mixer')
const Bindeable = require('../../mixins/Bindeable')

module.exports = class State extends mixer.extends([Propertiable, Bindeable]) {
  constructor(values) {

    super()
    const value = values.value
    delete values.value
    this._value = value
    Object.assign(this, values)
  }

  reset() {
    this.errors = new Array()
  }

  validate() {
    if (this.required && !this.value) {
      this.errors.push('This field is required')
    }

    if (this.disabled) {
      this.value = undefined
    }
  }

  get value() {
    return this._value || this.objectState.value[this.property.name]
  }

  set value(value) {
    if (this.objectState) {
      this.objectState.value[this.property.name] = value
    } else {
      this._value = value
    }
  }

}.define()
