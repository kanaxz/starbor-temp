const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const { String } = require('../types')

module.exports = mixer.mixin([Propertiable], (baseClass) => {
  return class Pageable extends baseClass {

    updateUrl() {
      const { name, codeField = 'code' } = this.constructor.definition
      const code = this[codeField]
      this.url = code ? `/${name}/${code}` : null
    }

    propertyChanged(property, ...args) {
      if (['name', 'code'].indexOf(property.name) !== -1) {
        this.updateUrl()
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
      state: {
        disabled: true,
      }
    }
  })