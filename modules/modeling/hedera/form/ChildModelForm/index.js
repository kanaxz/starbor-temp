const Component = require('hedera/Component')
const template = require('./template.html')
const context = require('core-client/context')
const RootModelState = require('processing/states/RootModelState')
const ObjectForm = require('../ObjectForm')
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

module.exports = class ChildModelForm extends ObjectForm {

  buildState(value) {
    return new RootModelState({
      property: {
        type: value.constructor,
      },
      value,
      isEdit: !!this.model,
      required: true,
      context,
    })
  }

  async onSubmitSuccess(value) {
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
    name: 'child-model-form',
    template,
  })

