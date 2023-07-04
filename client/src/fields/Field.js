const Component = require('hedera/Component')

module.exports = class Field extends Component {
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

  getValue(){
    return this.value
  }

}
  .define()
  .properties({
    type: 'string',
    label: 'string',
    name: 'string',
    required: 'any',
    errors: 'any',
    value: 'any',
  })