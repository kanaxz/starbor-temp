const mixer = require('../../mixer');
const Controllers = require('./Controllers')

module.exports = mixer.mixin((base) => {
  return class Controlleable extends base {
    static define(definition) {
      super.define(definition)
      this.controllers = new Controllers(this)
      return this
    }

    async canUpdate(user) {
      for (const controller of this.constructor.controllers) {
        if (controller.update) {
          const result = await controller.update.call(this, user)
          if (!result) {
            return false
          }
        }
      }
      return true
    }

    async canDelete(user) {
      for (const controller of this.constructor.controllers) {
        if (controller.delete) {
          const result = await controller.delete.call(this, user)
          if (!result) {
            return false
          }
        }
      }
      return true
    }
  }
})

