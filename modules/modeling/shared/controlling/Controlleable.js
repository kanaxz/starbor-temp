const mixer = require('core/mixer');
const Controllers = require('./Controllers')
const ControllerError = require('./ControllerError')
const setup = require('../setup')

module.exports = mixer.mixin((base) => {
  return class Controlleable extends base {
    static define(definition) {
      super.define(definition)
      this.controllers = new Controllers(this)
      return this
    }

    static async canCreate(context) {
      for (const controller of this.controllers) {
        const check = controller.create?.check
        if (check) {
          await check.call(this, context)
        }
      }
      return true
    }

    async canUpdate(...args) {
      const [context] = setup.getArgs(args)
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

    async canDelete(...args) {
      const [context] = setup.getArgs(args)
      for (const controller of this.constructor.controllers) {
        if (controller.delete?.check) {
          try {
            await controller.delete.check.call(this, context, this)
          } catch (err) {
            if (err instanceof ControllerError) {
              return false
            }
            throw err
          }
        }
      }
      return true
    }
  }
})

