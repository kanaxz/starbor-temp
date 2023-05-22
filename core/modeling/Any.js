const mixer = require('../mixer')
const Propertiable = require('../mixins/Propertiable')

const Buildable = require('./mixins/Buildable')
const Templateable = require('./mixins/Templateable')
const Methodeable = require('./mixins/Methodeable')
const utils = require('./utils')

module.exports = mixer.mixin([Propertiable, Methodeable, Buildable, Templateable], (base) => {
  return class Any extends base {
    constructor(...args) {
      super(...args)
      this.initialize()
    }

    static getType() {
      return this
    }


    static sanitizeProperty(property) {
      utils.propertySanitizers.forEach((sanitizer) => sanitizer(property))
    }
  }
})
  .define({
    name: 'any',
  })
