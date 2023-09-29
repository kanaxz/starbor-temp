const mixer = require('core/mixer')
const Base = require('./Base')
const renderer = require('./renderer')
class temp extends HTMLElement {

}

module.exports = class Component extends mixer.extends(temp, [Base]) {
  static define(definition) {

    if (definition?.name) {
      customElements.define(definition.name, this)
    }
    return super.define(definition)
  }



  get el() {
    return this
  }

  get definition() {
    return this.constructor.definition;
  }


  constructor() {
    super()
    this.scope = null
  }

  async process(scope) {
    if (this.processed) {
      console.warn('Already processed', this)
      return
    }
    this.processed = true
    renderer.process(this.el, scope)
    if (await renderer.renderVirtuals(this, scope)) {
      throw new Error('Incompatible')
    }
    await this.attach(scope)
  }

  async initialize() {
    await this.initializeContent()
    await this.initializeTemplate()
    await super.initialize()
  }

  async initializeContent() {
    if (this.definition.transclude) {
      this.transcludeContent = [
        ...this.childNodes
      ]
    } else
      return await renderer.renderContent(this, this.scope)
  }

  async initializeTemplate() {
    if (this.definition.template) {
      this.innerHTML = this.definition.template
      await renderer.renderContent(this, this.scope)
    }

    if (this.definition.transclude) {
      const container = this.transclude || this
      this.transcludeContent.forEach((n) => {
        container.appendChild(n)
      })
      await renderer.renderContent(container, this.scope.parent)
    }
  }

  event(name, arg) {
    const event = new CustomEvent(name, {
      bubbles: false,
    })
    Object.assign(event, arg)
    return this.dispatchEvent(event)
  }

  destroy() {
    renderer.workers.forEach((w) => w.destroy && w.destroy(this))
    this.childNodes.forEach(renderer.destroy)
    if (this.v) {
      for (const virtual of Object.values(this.v)) {
        virtual.destroy()
      }
    }
    super.destroy()
  }
}