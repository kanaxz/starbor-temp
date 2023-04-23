const Component = require('@core/Component')

module.exports = class Field extends Component {
  constructor() {
    super()
    this.validators = []
    this.classList.add('form-field')
    this.on('propertyChanged:value', this.b(this.onValueChanged))
  }


  onValueChanged() {
    for (const validator of this.validators) {

    }
  }

}
  .define()
  .properties({
    label: 'string',
    name: 'string',
    value: 'any',
  })