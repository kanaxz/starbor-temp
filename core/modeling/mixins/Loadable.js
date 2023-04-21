const mixer = require('../../mixer')
const Propertiable = require('../../Propertiable')

module.exports = mixer.mixin([Propertiable()], (base) => {
  return class Loadable extends base {
    constructor(...args) {
      super(...args)
      this.isLoaded = false
    }

    setLoad(load) {
      this.isLoaded = true
      for (const [propertyName, value] of Object.entries(load)) {
        //console.log(propertyName, value, this[propertyName])
        if (value && this[propertyName]) {
          this[propertyName].setLoad(value)
        }
      }
    }

    async load(load) {
      
    }
  }
})