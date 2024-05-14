const Component = require('hedera/Component')
const template = require('./template.html')
const context = require('core-client/context')
const RootObjectState = require('modeling/states/RootObjectState')
require('./style.scss')

const applyStates = (targetStates, statesPatch) => {
  Object.entries(statesPatch)
    .forEach(([k, patch]) => {
      const target = targetStates[k]
      Object.assign(target, patch)
      if (patch.states) {
        applyStates(target.states, patch.states)
      }
    })
}

const propagate = (state, patch) => {
  Object.values(state.states)
    .forEach((childState) => {
      Object.assign(childState, patch)
      if (childState.states) {
        propagate(childState, patch)
      }
    })
}

module.exports = class ObjectForm extends Component {
  constructor(values = {}) {
    super()
    Object.assign(this, values)
    this.mode = 'edit'
    this.on('propertyChanged:mode', this.b(this.onModeChanged))
    this.on('propertyChanged:states', this.b(this.updateStates))
  }

  buildState(value) {
    return new RootObjectState({
      property: {
        type: value.constructor,
      },
      value,
      isEdit: !!this.object,
      required: true,
      context,
    })
  }

  async onInit() {
    let value
    if (!this.object) {
      value = new this.type()
    } else {
      value = this.object.shadowClone()
    }
    this.state = this.buildState(value)
  }

  async onReady() {
    if (this.mode === 'read') {
      await this.updateStates()
    }

    await this.onModeChanged()
  }

  async onModeChanged() {
    if (this.mode === 'read') {
      propagate(this.state, { readOnly: this.mode === 'read', required: false })
    } else {
      await this.updateStates()
    }
  }

  handleFieldError() {
    const state = this.state.findFirstStateWithError()
    if (!state) { return false }
    const field = this.fieldset.fields[state.property.name]
    field.focus()
    field.scrollTo()
    return true
  }

  onSubmitSuccess() {

  }

  async onSubmit(e) {
    console.log('submit', e)
    e.stopPropagation()
    e.preventDefault()
    await this.updateStates()
    this.fieldset.showErrors()
    if (this.handleFieldError()) { return }

    const object = this.state.value
    this.event('submit', { object })
    await this.onSubmitSuccess(object)
  }

  async updateStates() {
    await this.state.applyLogics()

    if (this.states) {
      applyStates(this.state.states, this.states)
    }
    await this.state.validate()
  }

  async onFieldsetChanged() {
    await this.updateStates()
  }
}
  .define({
    name: 'object-form',
    template,
  })
  .properties({
    object: 'any',
    type: 'any',
    clone: 'any',
    mode: 'any',
    states: 'any',
  })


