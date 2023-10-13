const Component = require('hedera/Component')
const mixer = require('core/mixer')
const Registerable = require('../mixins/Registerable')
const Interactable = require('hedera/mixins/Interactable')

module.exports = class ModelComponent extends mixer.extends(Component, [Registerable]) {
  constructor(model) {
    super()
    this.model = model
    this.on('propertyChanged:model', this.b(this.update))
  }

  async onReady() {
    await this.update()
  }

  async update() {
    console.log(this, this.model)
    if (!this.model) { return }
    await this.model.load()
  }


}
  .define()
  .properties({
    model: 'any',
  })