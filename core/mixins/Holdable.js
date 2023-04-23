const mixer = require('../mixer')
const Eventable = require('./Eventable')
const Destroyable = require('./Destroyable')

const state = Symbol('holdState')
const instances = []

const loop = () => {
  //console.log('loop', instances)
  const currentDate = new Date()
  const copy = [...instances]
  for (const instance of copy) {
    const instanceState = instance[state]
    if (!instanceState.references.length && currentDate - instanceState.lastDate > 10 * 1000) {
      instance.destroy()
    }
  }
  setTimeout(loop, 5 * 1000)
}

module.exports = mixer.mixin([Destroyable, Eventable], (base) => {
  return class Holdable extends base {

    constructor(...args) {
      super(...args)
      this[state] = {
        references: [],
        lastDate: new Date()
      }
      instances.push(this)
    }


    hold(reference) {
      const existing = this[state].references.indexOf(reference)
      if (existing !== -1) {
        throw new Error('Could not hold')
      }
      this[state].references.push(reference)
      this[state].lastDate = new Date()
    }

    release(reference) {
      const referenceIndex = this[state].references.indexOf(reference)
      if (referenceIndex === -1) {
        throw new Error('Could not release')
      }

      this[state].references.splice(referenceIndex, 1)
      this[state].lastDate = new Date()
    }

    destroy() {
      const index = instances.indexOf(this)
      instances.splice(index, 1)
      return super.destroy()
    }
  }
})

loop()