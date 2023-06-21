const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const { String } = require('core/modeling/types')
const timeout = Symbol('timeout')
module.exports = mixer.mixin([Propertiable], (baseClass) => {
  return class Pageable extends baseClass {
    constructor(...args) {
      super(...args)
      Object.defineProperty(this, timeout, { enumerable: false, writable: true, value: null })
    }

    updateUrl() {
      const { name, codeField = 'code' } = this.constructor.definition
      const code = this[codeField]
      this.url = code ? `/${name}/${code}` : null
    }

    propertyChanged(property, ...args) {
      if (property.name !== 'url') {
        if (this[timeout]) {
          clearTimeout(this[timeout])
        }
        this[timeout] = setTimeout(() => {
          this.updateUrl()
        })
      }
      return super.propertyChanged(property, ...args)
    }
  }
})
  .define()
  .properties({
    url: {
      type: String,
      context: false,
    }
  })