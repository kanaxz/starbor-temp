const mixer = require("../../../mixer");
const Methods = require('./Methods')

module.exports = mixer.mixin((base) => {
  return class Methodeable extends base {
    static define(definition) {
      super.define(definition)
      this.methods = new Methods(this)
      return this
    }
  }
})

