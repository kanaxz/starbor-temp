const Array = require('core/types/Array')
const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const Bindeable = require('core/mixins/Bindeable')

module.exports = class State extends mixer.extends([Propertiable, Bindeable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }

  reset() {
    this.errors = new Array()
    this.message = new Array()
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

  get value(){
    if (this.objectState) {
      const parent = this.objectState.value
      return parent && parent[this.property.name]
    } else {
      return this._value
    }
  }

  validate() {
    if (this.required && !this.value) {
      this.errors.push('This field is required')
    }

    if (this.disabled) {
      this.value = undefined
    }
  }
}
  .define()
  .properties({
    disabled: 'any',
    required: 'any',
    messages: 'any',
    errors: 'any',
  })
