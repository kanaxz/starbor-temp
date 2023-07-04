const Component = require('hedera/Component')
const template = require('./template.html')
const navigator = require('@app/navigator')
const notifications = require('@app/notifications')

require('./style.scss')

module.exports = class ModelForm extends Component {
  constructor(values) {
    super(values)
    this.on('propertyChanged:model', this.b(this.update))
  }

  initialize() {
    this.update()
    return super.initialize()
  }

  async update() {

  }

  async onSubmit(e) {
    e.preventDefault()
    const value = this.fieldset.getValue()
    console.log({ value })
    try {
      await this.model.constructor.collection.update({
        _id: this.model._id,
      }, {
        $set: value
      })
      this.event('on-saved', { model: this.model })
    } catch (error) {
      this.event('on-error', { error })
      throw err
    }
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


