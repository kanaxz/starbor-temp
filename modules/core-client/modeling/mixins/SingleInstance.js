const Destroyable = require('core/mixins/Destroyable')
const mixer = require('core/mixer')
const Comparable = require('core/mixins/Comparable');
const Propertiable = require('core/mixins/Propertiable');
const Transformable = require('./Transformable');

const instances = [];

const checkDuplicates = () => {
  for (const i of instances) {
    for (const j of instances) {
      if (i !== j && i.compare(j)) {
        Object.assign(i, j)
        j.tranform(i)
        console.info('Transformation completed', i, j)
      }
    }
  }
}

const loop = () => {
  checkDuplicates()
  //setTimeout(loop, 1000)
}

const symbol = Symbol('singleInstanceId')

let id = 0

const SingleInstance = mixer.mixin([Destroyable, Comparable, Transformable], (base) => {
  return class SingleInstance extends base {

    static parse(object, ...args) {
      if (!object) {
        return object
      }

      const instance = instances.find((instance) => instance.compare(object))
      if (instance) {
        Object.assign(instance, object)
        return instance
      }

      const newInstance = super.parse(object, ...args)
      if (!newInstance) { return }
      newInstance[symbol] = id++
      instances.push(newInstance)
      checkDuplicates()
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
})

loop()

SingleInstance.symbol = symbol

module.exports = SingleInstance