const mixer = require('core/mixer');
const Controllers = require('./Controllers')

module.exports = mixer.mixin((base) => {
  return class Controlleable extends base {
    static define(definition) {
      super.define(definition)
      this.controllers = new Controllers(this)
      return this
    }

    async canUpdate(context) {
      for (const controller of this.constructor.controllers) {
        if (controller.update?.check) {
          const result = await controller.update.check.call(this, context, this)
          if (!result) {
            return false
          }
        }
      }
      return true
    }

    async canDelete(context) {
      for (const controller of this.constructor.controllers) {
        if (controller.delete) {
          const result = await controller.delete.check.call(this, context, this)
          if (!result) {
            return false
          }
        }
      }
      return true
    }
  }
})

