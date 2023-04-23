const mixer = require('../../mixer')
const Propertiable = require('../../mixins/Propertiable')
const Buildable = require('./Buildable')

module.exports = mixer.mixin([Propertiable, Buildable], (base) => {
  return class Identifiable extends base {
    static identities(identities) {
      this._identities = {
        ...(this._identities || {}),
        ...identities,
      }
      return this
    }

    identity(identityName = 'main') {
      const identity = this.constructor._identities[identityName]
      let result = identity.reduce((acc, propertyName) => {
        const property = this.constructor.properties.find((p) => p.name === propertyName)
        acc[propertyName] = property.type.toJSON(this[propertyName])
        return acc
      }, {})
      if (result.length === 1) {
        result = result[0]
      }
      return result
    }

    toJSON(property) {
      if (!property) {
        return super.toJSON(property)
      }

      const identitiyName = property.identity || 'main'
      const identity = this.identity(identitiyName)
      return identity
    }
  }
})