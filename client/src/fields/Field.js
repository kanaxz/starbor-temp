const Component = require('hedera/Component')
const State = require('./State')

module.exports = class Field extends Component {
  static stateType = State
  constructor(values = {}) {
    super()
    Object.assign(this, values)
    this.validators = []
    this.on('propertyChanged:value', this.b(this.onValueChanged))
  }


  onValueChanged() {
    for (const validator of this.validators) {

    }
  }

  getValue() {
    return this.state.value
  }

  setValue(value) {
    this.state.value = value
    console.log({...this})
    this.childForm.onFieldChanged()
  }

}
  .define()
  .properties({
    type: 'string',
    label: 'string',
    name: 'string',
    errors: 'any',
    state: 'any',
  })