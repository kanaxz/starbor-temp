const Destroyable = require('core/mixins/Destroyable')
const mixer = require('core/mixer')
const Comparable = require('core/mixins/Comparable');
const Propertiable = require('core/mixins/Propertiable');

const instances = [];

const checkDuplicates = () => {
  for (const i of instances) {
    for (const j of instances) {
      if (i !== j && i.compare(j)) {
        console.error('Duplicated instances', i, j)
        throw new Error()
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

const SingleInstance = mixer.mixin([Destroyable, Comparable], (base) => {
  return class SingleInstance extends base {
    constructor(values) {
      const instance = instances.find((instance) => instance.compare(values))
      if (instance) {
        Object.assign(instance, values)
        return instance
      } 
      super(values)
      this[symbol] = id++
      instances.push(this)
      checkDuplicates()
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