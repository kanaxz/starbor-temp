const Component = require('hedera/Component')
const Array = require('core/types/Array')

require('./style.scss')

module.exports = class Field extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
    this.classList.add('field')
    this.messages = new Array()
    this.validators = []

  }

  onInit() {
    this.on(this.state, 'propertyChanged:disabled', this.b(this.onDisabledChanged))
    this.on(this.state, 'propertyChanged:value', this.b(this.onValueChanged))
    this.onDisabledChanged()
    this.onValueChanged()
  }

  onDisabledChanged() {
    this.classList[this.state.disabled ? 'add' : 'remove']('disabled')
  }

  onValueChanged() {

  }

  message(text) {
    const msg = {
      text,
      start: new Date()
    }
    this.messages.push(msg)
    setTimeout(() => {
      this.messages.tryRemove(msg)
    }, 5000)
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.state.value = value
    this.touched = -1
    this.event('changed', { field: this })
  }
}
  .define()
  .properties({
    header: 'any',
    state: 'any',
    touched: 'any',
  })