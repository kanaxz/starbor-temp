const mixer = require('core/mixer')
const componentsService = require('../componentsService')

module.exports = mixer.mixin((base) => {
  return class Registerable extends base {
    static register(type, name) {
      componentsService.register(type, name, this)
      return this
    }
  }
})