const Component = require('hedera/Component')
const template = require('./template.html')
const Array = require('core/types/Array')

require('./style.scss')

module.exports = class ModelForm extends Component {
  constructor() {
    super()
    this.forms = new Array()
  }

  target(form) {

    const index = this.forms.indexOf(form)
    console.log('targetting', form, index)
    if (index === -1) { throw new Error() }

    this.forms.splice(index + 1, this.forms.length - index + 1)
  }

  show(form) {
    this.forms.push(form)
    form.addEventListener('saved', () => {
      this.forms.remove(form)
    })
  }

  onSaved({ model }) {
    console.log('model saved', model)
    this.event('saved', { model })
  }
}
  .define({
    name: 'model-form',
    template,
  })
  .properties({
    model: 'any',
    type: 'any',
  })


