const renderer = require("./renderer")
const Scope = require("./Scope")
const Bindeable = require("core/mixins/Bindeable")
const Propertiable = require("core/mixins/Propertiable")
const mixer = require('core/mixer')

module.exports = mixer.mixin([Bindeable, Propertiable], (base) => {
  return class Base extends base {
    static variables(variables) {
      this._variables = {
        ...(this._variables || {}),
        ...variables
      }
      return this
    }


    get definition() {
      return this.constructor.definition;
    }

    get el() {
      throw new Error('Must implement el')
    }

    constructor() {
      super()
      this.isInitialized = false
      this.isInitializing = false
      this.scope = null
    }

    async processed(parentScope) {
      if (!this.canInitialize())
        return
      await this.attach(parentScope)
    }

    async attach(scope) {
      if (mixer.is(scope, Base))
        scope = scope.scope
      this.scope = new Scope({
        parent: scope,
        source: this,
        variables: this.constructor._variables
      })
      await this.initialize()
    }


    canInitialize() {
      return !this.isInitializing && !this.isInitialized
    }

    async initialize() {
      if (this.isInitializing || this.isInitialized) {
        throw new Error()
      }
      this.isInitializing = true
      await this.initializeContent()
      if (this.definition.template)
        await this.initializeTemplate()
      await this.initialized()
    }

    async initializeContent() {
      if (this.definition.transclude) {
        this.transcludeContent = [
          ...this.el.childNodes
        ]
      } else
        return await renderer.renderContent(this.el, this.scope)
    }

    async initializeTemplate() {
      if (!this.definition.template)
        throw new Error("The control '" + this.definition.name + "' hasn't a template");
      this.innerHTML = this.definition.template
      await renderer.renderContent(this.el, this.scope)
      if (this.definition.transclude) {
        const container = this.transclude || this.el
        this.transcludeContent.forEach((n) => {
          container.appendChild(n)
        })
        await renderer.renderContent(container, this.scope.parent)
      }
      return null
    }

    async initialized() {
      if (this.isInitialized == true || !this.isInitializing)
        throw new Error("Cannot initialize control")
      this.isInitializing = false
      this.isInitialized = true
    }

    destroy() {
      renderer.destroy(this.el)
    }

    destructor() {
      this.childNodes.forEach(renderer.destroy)
    }
  }

})
  .define()
  .properties({
    isInitialized: { type: 'any' }
  })

