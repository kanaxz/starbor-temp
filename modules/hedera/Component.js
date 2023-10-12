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

  process(scope) {
    if (this.processed) {
      console.trace('Already processed', this)
      return
    }
    this.processed = true
    renderer.process(this.el, scope)
    if (renderer.renderVirtuals(this, scope)) {
      throw new Error('Incompatible')
    }
    this.attach(scope)
  }

  initialize() {
    super.initialize()
    this.initializeContent()
    this.initializeTemplate()
    Promise.resolve(this.onReady())
      .catch((err) => {
        console.error(err)
      })
  }

  onReady() { }

  initializeContent() {
    if (this.definition.transclude) {
      this.transcludeContent = [
        ...this.childNodes
      ]
    } else
      renderer.renderContent(this, this.scope)
  }

  initializeTemplate() {
    if (this.definition.template) {
      this.innerHTML = this.definition.template
      renderer.renderContent(this, this.scope)
    }

    if (this.definition.transclude) {
      const container = this.transclude || this
      this.transcludeContent.forEach((n) => {
        container.appendChild(n)
      })
      renderer.renderContent(container, this.scope.parent)
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
    console.log('component destroyed', this, { ...this })
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