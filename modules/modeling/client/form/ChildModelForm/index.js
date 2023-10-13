const Component = require('hedera/Component')
const template = require('./template.html')
const context = require('hedera/context')
const RootModelState = require('processing/states/RootModelState')
require('./style.scss')

module.exports = class ChildModelForm extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  handleFieldError() {
    const state = this.state.findFirstStateWithError()
    if (!state) { return false }

    const field = this.fieldset.fields[state.property.name]
    field.focus()
    field.scrollTo()
    return true
  }

  async onSubmit(e) {
    e.preventDefault()
    this.updateStates()
    this.fieldset.showErrors()
    if (this.handleFieldError()) { return }

    const value = this.state.value
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

      this.event('saved', { model })
    } catch (error) {
      console.log('error', error)
      this.event('error', { error })
      throw error
    }
  }

  isCreate() { return !this.model }

  async updateStates() {
    const { value } = this.fieldset
    const state = new RootModelState({
      type: value.constructor,
      value,
      required: true,
      context
    })
    for (const controller of state.value.constructor.controllers) {
      const isCreate = this.isCreate()
      const logic = isCreate ? controller.create?.logic : controller.update?.logic
      if (logic) {
        await logic(context, state.states, this.model)
      }
    }
   
    await state.validate()
    this.fieldset.importState(state)
    this.state = state
  }

  async onFieldsetChanged() {
    await this.updateStates()
  }

  async onReady() {
    await this.updateStates()
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


