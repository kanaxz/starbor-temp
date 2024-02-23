const mixer = require('core/mixer')
const loadingQueue = '@loadingQueue'
const stateKey = '@loadState'
const Propertiable = require('core/mixins/Propertiable')
const Bool = require('../types/Bool')
const setup = require('../setup')

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

    setPathsState(state, paths, err) {
      throw new Error('Not implemented')
    }

    setState(state, paths, err, fromSelf, result) {
      this.setPathsState(state, paths, err, fromSelf)


      if (state === this[stateKey] || this[stateKey] === 'loaded') {
        return false
      }
      this.loaded = state === 'loaded'
      this[stateKey] = state
      if (state === 'error') {
        //console.error(err)
        this[loadingQueue].forEach(({ reject }) => reject(err))
        this[loadingQueue] = null
      } else if (state === 'loaded') {
        this[loadingQueue].forEach(({ resolve }) => resolve(result))
        this[loadingQueue] = null
      }

      return true
    }

    setLoadState(...args) {
      this.setState('loaded', ...args)
    }

    innerLoad() {
      throw new Error(`innerLoad not implemented on ${this.constructor.definition.name}`)
    }

    async loadAssociation(context, propertyName, paths) {
      throw new Error('Load association not implemented')
    }

    async load(...args) {
      const [context, paths = {}] = setup.getArgs(args)
      const state = this[stateKey]
      if (state === 'error') {
        this.state = 'empty'
      }
      //console.warn('load', this, state, paths )
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
        this.setState('loading', paths, null, true)
        try {
          const result = await this.innerLoad(context, paths)
          //console.log(this, 'loaded')
          this.setState('loaded', paths, null, true, result)
          return result
        } catch (err) {
          this.setState('error', paths, err, null, true)
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
Object.assign(Loadable, {
  loadingQueue,
  stateKey,
})
module.exports = Loadable