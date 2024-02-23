const Array = require('core/types/Array')
const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const Bindeable = require('core/mixins/Bindeable')
const setup = require('../setup')

class BaseState extends mixer.extends([Propertiable, Bindeable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }

  reset() {
    this.errors = new Array()
    this.message = new Array()
    this.disabled = false
    this.required = false
  }

  async valueChanged() {
    await this.propertyChanged({
      name: 'value',
    }, this.value)
  }

  set value(value) {
    if (this.objectState) {
      this.objectState.value[this.property.name] = value
    } else {
      this._value = value
      this.valueChanged()
    }
  }

  get value() {
    if (this.objectState) {
      const parent = this.objectState.value
      return parent && parent[this.property.name]
    } else {
      return this._value
    }
  }

  validate() {
    if (this.disabled) {
      this.value = undefined
      return
    }
    if (this.required && !this.value) {
      this.errors.push('This field is required')
    }
  }
}

BaseState
  .define()
  .properties({
    disabled: 'any',
    required: 'any',
    messages: 'any',
    errors: 'any',
  })

module.exports = class State extends mixer.extends(BaseState, setup.state) { }
  .define()
