const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const { String } = require('core/modeling/types')

module.exports = mixer.mixin([Propertiable], (baseClass) => {

  return class Pageable extends baseClass {
    constructor(...args) {
      super(...args)
      this.updateUrl()
    }

    updateUrl() {
      const { name, codeField = 'code' } = this.constructor.definition
      this.url = `/${name}/${this[codeField]}`
    }

    propertyChanged(...args) {
      this.updateUrl()
      return super.propertyChanged(...args)
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