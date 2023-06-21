const mixer = require('../mixer')
const Destroyable = require('./Destroyable')

const state = Symbol('holdState')
const instances = []

const HOLD_DURATION = 5


const getPath = (i1, i2) => {
  const references = i1[state].references
  for (const child of references) {
    if (child === i2) {
      return [i1]
    }
    const childPath = getPath(child, i2)
    if (childPath) {
      return [i1, ...childPath]
    }
  }
}

const getCircular = (instance) => {

}


const getCirculars = () => {
  return instances.filter((start) => {
    let current = start
    while (current) {
      if (current[Destroyable.symbol]) { return false }

      const references = current[state].references
      if (references.length !== 1) { return false }

    }
  })
}

const loop = () => {
  //console.log('holdables', instances)
  const currentDate = new Date()
  const copy = [...instances]
  for (const instance of copy) {
    const instanceState = instance[state]
    if (!instanceState.references.length && currentDate - instanceState.lastDate > HOLD_DURATION * 1000) {
      instance.destroy()
    }
  }
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