const mixer = require("../mixer")

module.exports = mixer.mixin([], (baseClass) => {

  return class Abstractable extends baseClass {
    constructor(...args) {
      super(...args)
      if (this.constructor.definition.abstract) {
        //console.log(this.constructor.definition)
        throw new Error()
      }
    }
  }
})