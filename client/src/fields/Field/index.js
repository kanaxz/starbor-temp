const Component = require('hedera/Component')
const Array = require('core/types/Array')

require('./style.scss')

module.exports = class Field extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
    this.classList.add('field')
    this.validators = []
    this.on('propertyChanged:value', this.b(this.onValueChanged))
    this.on('propertyChanged:hidden', this.b(this.onHiddenChanged))
  }

  onHiddenChanged() {
    this.classList[this.hidden ? 'add' : 'remove']('hidden')
  }


  onValueChanged() {
    for (const validator of this.validators) {

    }
  }

  getValue() {
    return this.value
  }

  resetErrors() {
    this.errors = new Array()
  }

  setValue(value) {
    this.value = value
    this.touched = -1
    this.event('changed', { field: this })
  }

  importState(state) {
    if (this.touched === -1) {
      this.touched = true
    }
    this.hidden = state.disabled
    this.value = state.value
    this.required = state.required
    this.errors = state.errors
  }
}
  .define()
  .properties({
    type: 'string',
    label: 'string',
    name: 'string',
    errors: 'any',
    value: 'any',
    required: 'any',
    hidden: 'any',
    disabled: 'any',
    touched: 'any',
  })