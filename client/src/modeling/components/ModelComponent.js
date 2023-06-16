const Component = require('hedera/Component')
const mixer = require('core/mixer')
const Registerable = require('@app/main/mixins/Registerable')
const Interactable = require('hedera/mixins/Interactable')

module.exports = class ModelComponent extends mixer.extends(Component, [Registerable]) {
  constructor(model) {
    super()
    this.model = model
  }
}
  .define()
  .properties({
    model: 'any',
  })
