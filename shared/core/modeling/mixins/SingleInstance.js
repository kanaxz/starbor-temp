const Destroyable = require('../../Destroyable')
const mixer = require('../../mixer')
const Buildable = require('./Buildable')

const instances = []

module.exports = mixer.mixin([Buildable(), Destroyable()], (base) => {
  return class SingleInstance extends base {

    static build(json, property) {
      if (!json) { return null }

      let instance = instances.find((instance) => instance._id === json._id && instance instanceof this)
      if (!instance) {
        instance = super.build(json, property)
        instances.push(instance)
      }

      return instance
    }

    destroy() {
      const index = instances.indexOf(this)
      instances.splice(index, 1)
      return super.destroy()
    }
  }
})