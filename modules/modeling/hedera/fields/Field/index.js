const Component = require('hedera/Component')
const Array = require('core/types/Array')
const template = require('./template.html')
require('./style.scss')

module.exports = class Field extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  onInit() {
    this.on(this.state, 'propertyChanged:value', this.b(this.onValueChanged))
    this.onValueChanged()
  }

  onValueChanged() {

  }

  message(text) {
    const msg = {
      text,
      start: new Date()
    }
    this.state.messages.push(msg)
    setTimeout(() => {
      this.state.messages.tryRemove(msg)
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
  .define({
    template,
  })
  .properties({
    header: 'any',
    state: 'any',
    touched: 'any',
  })