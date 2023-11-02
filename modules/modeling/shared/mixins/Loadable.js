const mixer = require('core/mixer')
const loadingQueue = Symbol('loadingQueue')
const stateKey = Symbol('loadableState')
const Propertiable = require('core/mixins/Propertiable')
const Bool = require('../types/Bool')

const Loadable = mixer.mixin([Propertiable], (base) => {
  return class extends base {
    constructor(...args) {
      super(...args)

      Object.defineProperties(this, {
        [stateKey]: {
          enumerable: false,
          writable: true,
          value: 'empty'
        },
        [loadingQueue]: {
          enumerable: false,
          writable: true,
          value: []
        }
      })
    }

    setState(state, paths, err) {
      for (const [propertyName, value] of Object.entries(paths)) {
        if (value && this[propertyName]) {
          this[propertyName].setState(state, value, err)
        }
      }


      this.loaded = state === 'loaded'

      if (state === this[stateKey]) {
        return
      }
      this[stateKey] = state
      if (state === 'error') {
        //console.error(err)
        this[loadingQueue].forEach(({ reject }) => reject(err))
        this[loadingQueue] = null
      } else if (state === 'loaded') {
        this[loadingQueue].forEach(({ resolve }) => resolve())
        this[loadingQueue] = null
      }
    }

    setLoadState(...args) {
      this.setState('loaded', ...args)
    }

    innerLoad() {
      throw new Error(`innerLoad not implemented on ${this.constructor.definition.name}`)
    }

    async loadAssociation(context, propertyName, paths) {
      await this[propertyName].load(context, paths)
    }

    async load(context, paths = {}) {
      if (this.state === 'error') {
        this.state = 'empty'
      }
      const state = this[stateKey]
      if (state === 'loaded') {
        if (paths === true) { return }
        for (const [propertyName, subPaths] of Object.entries(paths)) {
          await this.loadAssociation(context, propertyName, subPaths)
        }
        return
      }
      else if (state === 'loading') {
        const promise = new Promise((resolve, reject) => {
          this[loadingQueue].push({ resolve, reject })
        })
        await promise
        // make sure the paths are loaded
        await this.load(context, paths)
      } else if (state === 'empty') {
        this.setState('loading', paths)
        try {
          await this.innerLoad(context, paths)
          this.setState('loaded', paths)
        } catch (err) {
          this.setState('error', paths, err)
          throw err
        }
      } else {
        throw new Error(`Unknown state ${state} on ${this.toString()}`)
      }
    }

    unload() {
      this.setState('empty')
    }
  }
})
  .define()
  .properties({
    loaded: {
      type: Bool,
      context: false,
    }
  })

Loadable.stateSymbol = stateKey
module.exports = Loadable