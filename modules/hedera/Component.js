const mixer = require('core/mixer')
const Base = require('./Base')
const { workers } = require('./global')
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
      return false
    }
    this.processed = true
    await scope.process(this.el)
    if (await scope.renderVirtuals(this)) {
      throw new Error('Incompatible')
    }
    await this.attach(scope)
    return true
  }

  async initialize() {
    await super.initialize()
    await this.initializeContent()
    await this.initializeTemplate()
    Promise.resolve(this.onReady())
      .catch((err) => {
        console.error(err)
      })
  }

  onReady() { }

  async initializeContent() {
    if (this.definition.transclude) {
      this.transcludeContent = [
        ...this.childNodes
      ]
    } else {
      await this.scope.renderContent(this)
    }
  }

  async initializeTemplate() {
    if (this.definition.template) {
      this.innerHTML = this.definition.template
      await this.scope.renderContent(this)
    }

    if (this.definition.transclude) {
      const container = this.transclude || this
      this.transcludeContent.forEach((n) => {
        container.appendChild(n)
      })
      await this.scope.parent.renderContent(container)
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
    workers.forEach((w) => w.destroy && w.destroy(this))
    if (this.v) {
      for (const virtual of Object.values(this.v)) {
        virtual.destroy(true)
      }
    }
    super.destroy()
    console.warn('component destroyed', this)
  }


}