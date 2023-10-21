const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const { String } = require('../types')
const proto = require('core/utils/proto')


module.exports = mixer.mixin([Propertiable], (baseClass) => {
  return class Pageable extends baseClass {

    updateUrl(codeField) {
      const { name } = this.constructor.definition
      const code = this[codeField]
      this.url = code ? `/${name}/${code}` : null
    }

    updateTitle(titleField){
      this.title = this[titleField]
    }

    propertyChanged(property, ...args) {
      const { codeField } = this.constructor.definitions.find((d) => d.codeField)
      const { titleField } = this.constructor.definitions.find((d) => d.titleField)
      if (property.name === codeField) {
        this.updateUrl(codeField)
      }
      if (property.name === titleField) {
        this.updateTitle(titleField)
      }
      return super.propertyChanged(property, ...args)
    }

  }
})
  .define({
    codeField: 'code',
    searchField: 'name',
    titleField: 'name',
  })
  .properties({
    url: {
      type: String,
      context: false,
      state: {
        disabled: true,
      }
    },
    title: {
      type: String,
      context: false,
      state: {
        disabled: true,
      }
    }
  })