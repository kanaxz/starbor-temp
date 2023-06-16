const mixer = require('../../mixer')
const loadingQueue = Symbol('loadingQueue')
const state = Symbol('loadableState')

const LoadableMixin = mixer.mixin((base) => {
  return class Loadable extends base {
    constructor(...args) {
      super(...args)
      this[loadingQueue] = []
      this[state] = 'empty'
    }

    setLoadState(paths) {
      this[state] = 'loaded'
      for (const [propertyName, value] of Object.entries(paths)) {
        if (value && this[propertyName]) {
          this[propertyName].setLoadState(value)
        }
      }
    }

    getLoadState() {
      if (this[state] !== 'loaded') {
        return false
      }
      return Object.entries(this)
        .reduce((acc, [k, v]) => {
          if (mixer.is(v, LoadableMixin)) {
            const subState = v.getLoadState()
            if (subState) {
              acc[k] = subState
            }
          }
          return acc
        }, {})
    }

    innerLoad() {
      throw new Error(`innerLoad not implemented on ${this.constructor.definition.name}`)
    }

    async load(paths = {}) {
      //console.log('loading', this[state], this, paths)
      if (this[state] === 'loaded') {
        if (paths === true) { return }
        for (const [propertyName, subPaths] of Object.entries(paths)) {
          await this[propertyName].load(subPaths)
        }
        return
      }
      else if (this[state] === 'loading') {
        //console.log('wtf', this)
        const promise = new Promise((resolve, reject) => {
          this[loadingQueue].push({ resolve, reject })
        })
        await promise
        // make sure the paths are loaded
        await this.load(paths)
      } else {
        this[state] = 'loading'
        try {
          await this.innerLoad(paths)
          this.setLoadState(paths)
          this[loadingQueue].forEach(({ resolve }) => resolve())
          this[state] = 'loaded'
          this[loadingQueue] = []
        } catch (err) {
          this[loadingQueue].forEach(({ reject }) => reject(err))
          this[state] = 'loaded'
          this[loadingQueue] = []
          throw err
        }
      }
    }
  }
})

LoadableMixin.stateSymbol = state
module.exports = LoadableMixin