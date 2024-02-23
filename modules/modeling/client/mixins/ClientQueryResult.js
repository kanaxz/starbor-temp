const mixer = require('core/mixer')


module.exports = mixer.mixin((base) => {
  return class extends base {
    async onModelCreated(model) {
      await this.checkModel(model)
    }

    async onModelUpdated(model) {
      await this.checkModel(model)
    }
  }
})