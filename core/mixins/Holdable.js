const mixer = require('../mixer')
const Destroyable = require('./Destroyable')

const state = Symbol('holdState')
const instances = []

const HOLD_DURATION = 5

let circulars

const countCirculars = (references, limits) => {
  return references
    .filter((instance) => {
      if (limits.indexOf(instance) !== -1) {
        return true
      }
      return isCircular(instance, limits)
    })
    .length
}

const isCircular = (instance, limits = []) => {
  if (circulars.indexOf(instance) !== -1) { return true }
  limits = [...limits, instance]
  const references = instance[state]
    .references
    .filter((reference) => reference[state])
  if (references.length !== instance[state].references.length) {
    return false
  }
  const count = countCirculars(references, limits)
  const circular = count === references.length
  if (circular) {
    //console.log('---CIRCULAR', instance)
    circulars.push(circular)
  }
  return circular
}

const shouldDestroy = (instance) => {
  const currentDate = new Date()
  const instanceState = instance[state]
  if (currentDate - instanceState.lastDate < HOLD_DURATION * 1000) { return false }
  if (!instanceState.references.length) { return true }

  const circular = isCircular(instance)
  return circular
}

const loop = () => {
  console.log('holdables', instances)
  circulars = []
  instances
    .filter(shouldDestroy)
    .forEach((i) => i.destroy())
  setTimeout(loop, HOLD_DURATION / 3 * 1000)
}

module.exports = mixer.mixin([Destroyable], (base) => {
  return class Holdable extends base {

    constructor(...args) {
      super(...args)
      Object.defineProperty(this, state, {
        enumerable: false,
        writable: true,
        value: {
          references: [],
          lastDate: new Date()
        }
      })
      instances.push(this)
    }

    hold(reference) {
      if (reference === this) {
        console.error({ ...reference })
        throw new Error('A object cannot hold itself')
      }
      const existing = this[state].references.indexOf(reference)
      if (existing !== -1) {
        //throw new Error('Could not hold')
        return
      }
      this[state].references.push(reference)
      this[state].lastDate = new Date()
    }

    async holdWhile(fn) {
      const id = {}
      this.hold(id)
      await fn()
      this.release(id)
    }

    release(reference) {
      const referenceIndex = this[state].references.indexOf(reference)
      if (referenceIndex === -1) {
        //throw new Error('Could not release')
        return
      }

      this[state].references.splice(referenceIndex, 1)
      this[state].lastDate = new Date()
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