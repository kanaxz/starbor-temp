const mixer = require('core/mixer')
const RessourceOwner = require('./RessourceOwner')
const Model = require('modeling/types/Model')
module.exports = mixer.mixin([RessourceOwner], (base) => {
  return class RessourceUserMixin extends base {
    async getRessourcesOwners(context) {
      const properties = this.constructor.properties.filter((p) => {
        if (p.type.hasMixin(RessourceOwner)) {
          return true
        }

        if (p.type.definition.template?.hasMixin(RessourceOwner)) {
          return true
        }

        return false
      })


      for (const property of properties) {
        await this[property.name].load(context)
      }

      const result = properties.flatMap((property) => {
        if (property.type.prototype instanceof Array) {
          return this[property.name]
        } else if (property.type instanceof Model) {
          return [this[property.name]]
        } else {
          throw new Error('Type not recognized')
        }
      })

      return [this, ...result]
    }
  }
})