const Destroyable = require('core/mixins/Destroyable')
const mixer = require('core/mixer')
const Equalable = require('core/mixins/Equalable');
const Transformable = require('./Transformable')
const types = []

const loop = () => {
  for (const type of types) {
    type.checkDuplicates()
  }
  //setTimeout(loop, 1000)
}

const symbol = Symbol('singleInstanceId')

let id = 0

const SingleInstance = mixer.mixin([Destroyable, Equalable, Transformable], (base) => {

  const instances = []

  class SingleInstance extends base {
    static checkDuplicates() {
      for (const i of instances) {
        for (const j of instances) {
          if (i === j) { continue }
          if (i.equals(j)) {
            console.log('equals', i.toJSON(), j.toJSON())
            Object.assign(i, j)
            j.tranform(i)
            console.info('Transformation completed', i, j)
          }
        }
      }
    }

    static parse(object, ...args) {
      if (!object || object instanceof this) {
        return object
      }
      const newInstance = super.parse(object, ...args)
      const instance = instances.find((instance) => instance.equals(newInstance))

      if (instance) {
        Object.assign(instance, object)
        newInstance.destroy()
        object[symbol] = id++
        return instance
      }

      instances.push(newInstance)
      this.checkDuplicates()
      return newInstance
    }

    destroy() {
      const index = instances.indexOf(this)
      if (index !== -1) {
        instances.splice(index, 1)
      }
      return super.destroy()
    }
  }

  types.push(SingleInstance)

  return SingleInstance
})

loop()

SingleInstance.symbol = symbol

module.exports = SingleInstance