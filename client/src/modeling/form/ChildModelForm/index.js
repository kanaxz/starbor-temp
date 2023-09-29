const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class ChildModelForm extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  async onSubmit(e) {
    e.preventDefault()
    const value = this.fieldset.getValue()
    console.log('a', { value })
    try {
      let model
      if (this.model) {
        model = await this.type.collection.update({
          _id: this.model._id,
        }, {
          $set: value
        })
      } else {
        model = await this.type.collection.create(value)
      }

      console.log({ model })
      this.event('saved', { model })
    } catch (error) {
      console.log('error', error)
      this.event('error', { error })
      throw err
    }
  }

  updateStates() {
    const type = this.fieldset.currentOption.value
    const { states } = this.fieldset.state
    type.controllers.forEach((controller) => {
      if (controller.update.logic) {
        controller.update.logic(this.context, states)
      }
    })
    console.log(states)
  }

  onFieldChanged() {
    this.updateStates()
  }

  async initialized() {
    await super.initialized()
    this.updateStates()
  }
}
  .define({
    name: 'child-model-form',
    template,
  })
  .properties({
    model: 'any',
    type: 'any',
  })


