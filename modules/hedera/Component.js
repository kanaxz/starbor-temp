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

  async render(scope) {
    if (this.rendered) {
      console.warn('Already rendered', this)
      return null
    }
    this.rendered = true
    await scope.process(this.el)
    if (await scope.renderVirtuals(this)) {
      console.warn('Virtual taking control')
      return
      //throw new Error('Incompatible')
    }
    scope.nodes.push(this)
    await this.attach(scope)
    return this
  }

  async initialize() {
    this.scope.type = this.constructor
    await super.initialize()
    this.initialContent = [...this.childNodes]
    await this.initializeTemplate()
    Promise.resolve(this.onReady())
      .catch((err) => {
        console.error(err)
      })
  }

  onReady() { }

  async initializeTemplate() {
    const definition = this.constructor.definitions.find((d) => d.template)
    if (definition) {
      this.innerHTML = definition.template
      await this.scope.renderContent(this)
    }

    await this.scope.renderSlots(this.initialContent, this.scope.parent)
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
    //console.warn('component destroyed', this)
  }


}