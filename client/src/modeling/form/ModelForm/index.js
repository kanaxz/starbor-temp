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
      await navigator.navigate(this.model.url)
      notifications.notify({
        type: 'success',
        message: 'Model saved !',
      })
    } catch (err) {
      notifications.notify({
        type: 'error',
        message: err.message,
      })
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
  })


