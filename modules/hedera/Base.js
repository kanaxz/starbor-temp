const Bindeable = require('core/mixins/Bindeable')
const Propertiable = require('core/mixins/Propertiable')
const Listening = require('./mixins/Listening')
const mixer = require('core/mixer')
const Scope = require("./Scope")
const { base } = require('./setup')
const Destroyable = require('core/mixins/Destroyable')

console.log({ base })

const Base = mixer.mixin([Destroyable, Bindeable, Propertiable, Listening], (base) => {
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
      await this.onInit()
      this.isInitialized = true
    }


    async onInit() { }

    propertyChanged(...args) {
      if (!this.isInitialized) {
        return
      }

      return super.propertyChanged(...args)
    }

    destroy() {
      this.scope.destroy()
      super.destroy()
    }

  }

})
  .define()



module.exports = mixer.mixin([Base, ...base], (base) => class extends base { })
  .define()
  .properties({
    isInitialized: { type: 'any' }
  })
