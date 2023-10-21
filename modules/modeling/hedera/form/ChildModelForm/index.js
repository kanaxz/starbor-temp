const Component = require('hedera/Component')
const template = require('./template.html')
const context = require('core-client/context')
const RootModelState = require('processing/states/RootModelState')
require('./style.scss')

module.exports = class ChildModelForm extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
  }

  async onInit() {
    let value
    if (!this.model) {
      value = new this.type()
    } else {
      value = this.model.shadowClone()
    }

    console.log({ value })
    this.state = new RootModelState({
      property: {
        type: value.constructor,
      },
      value,
      required: true,
      context
    })

    console.log(this.state)

    await this.updateStates()
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
    await this.updateAndImportState()
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

  async updateAndImportState() {
    await this.updateStates()
    
  }

  async updateStates() {
    this.state.reset()
    for (const controller of this.state.value.constructor.controllers) {
      const isCreate = this.isCreate()
      const logic = isCreate ? controller.create?.logic : controller.update?.logic
      if (logic) {
        await logic(context, this.state.states, this.state.value)
      }
    }

    await this.state.validate()
  }

  async onFieldsetChanged() {
    await this.updateAndImportState()
  }
}
  .define({
    name: 'child-model-form',
    template,
  })
  .properties({
    model: 'any',
    type: 'any',
    clone: 'any',
  })


