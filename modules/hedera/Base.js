const Bindeable = require("core/mixins/Bindeable")
const Propertiable = require("core/mixins/Propertiable")
const Listening = require('./mixins/Listening')
const mixer = require('core/mixer')
const Scope = require("./Scope")
const Holder = require("core-client/modeling/mixins/Holder")

module.exports = mixer.mixin([Bindeable, Propertiable, Listening, Holder], (base) => {
  return class Base extends base {

    static variables(variables) {
      this._variables = {
        ...(this._variables || {}),
        ...variables
      }
      return this
    }



    constructor() {
      super()
      this.isInitialized = false
      this.isInitializing = false
    }

    canInitialize() {
      return !this.isInitializing && !this.isInitialized
    }

    async attach(scope) {
      this.scope = new Scope({
        parent: scope,
        source: this,
        variables: this.constructor._variables
      })
      await this.initialize()
    }

    async initialize() {
      if (!this.canInitialize()) {
        console.error(this, this.isInitialized, this.isInitializing)
        throw new Error()
      }

      this.isInitializing = true
      await this.initialized()
    }

    async initialized() {
      this.isInitializing = false
      this.isInitialized = true
    }

    propertyChanged(...args) {
      if (!this.isInitialized) {
        return
      }

      return super.propertyChanged(...args)
    }

    destroy() { }
  }

})
  .define()
  .properties({
    isInitialized: { type: 'any' }
  })

