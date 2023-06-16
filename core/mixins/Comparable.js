const mixer = require("../mixer")
const Destroyable = require('./Destroyable')

module.exports = mixer.mixin([Destroyable], (baseClass) => {

  return class Comparable extends baseClass {
    compare() {
      throw new Error('Compare not implemented')
    }
  }
})