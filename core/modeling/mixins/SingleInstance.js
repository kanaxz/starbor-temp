const Destroyable = require('../../mixins/Destroyable')
const mixer = require('../../mixer')
const Indexable = require('./Indexable')
const Comparable = require('../../mixins/Comparable')

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

module.exports = mixer.mixin([Destroyable, Comparable], (base) => {
  return class SingleInstance extends base {
    constructor(...args) {
      super(...args)

      const instance = instances.find((instance) => instance.constructor === this.constructor && instance.compare(this))
      if (instance) {
        Object.assign(instance, this.toJSON())
        this.destroy()
        return instance
      } else {
        instances.push(this)
        checkDuplicates()
        return this
      }
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