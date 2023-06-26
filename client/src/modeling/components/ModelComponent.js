const Component = require('hedera/Component')
const mixer = require('core/mixer')
const Registerable = require('@app/main/mixins/Registerable')
const Interactable = require('hedera/mixins/Interactable')

module.exports = class ModelComponent extends mixer.extends(Component, [Registerable]) {
  constructor(model) {
    super()
    this.model = model
    this.on('propertyChanged:model', this.b(this.update))
  }

  async initialize() {
    await this.update()
    await super.initialize()
  }

  async update() {
    console.log('modelCOmponent', this.model)
    if (!this.model) { return }
    await this.model.load()
  }


}
  .define()
  .properties({
    model: 'any',
  })
