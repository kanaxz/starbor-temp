const ObjectState = require('./ObjectState')

module.exports = class RootObjectState extends ObjectState {
  reset() {
    super.reset()
    this.required = true
  }

  async applyLogics() {
    this.reset()
    for (const controller of this.property.type.controllers) {
      const logic = !this.isEdit ? controller.create?.logic : controller.update?.logic
      if (logic) {
        await logic(this.context, this.states, this.oldValue)
      }
    }
  }
}
  .define()