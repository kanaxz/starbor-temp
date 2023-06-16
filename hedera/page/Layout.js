const Component = require('../Component')
const renderer = require('../renderer')
const LocalStorageable = require('../mixins/LocalStorageable')
const mixer = require('core/mixer')

module.exports = class Layout extends mixer.extends(Component, [LocalStorageable]) {
  async initialized() {
    await super.initialized()
    if (!this.container)
      throw new Error("Layout '" + this.constructor.name + "' must implement a container");
  }

  async setView(view) {
    const oldView = this.currentView
    if (oldView) {
      this.container.removeChild(oldView)
    }
    this.currentView = view
    this.container.appendChild(this.currentView)
    await this.currentView.attach(this.scope)
    if (oldView) {
      renderer.destroy(oldView)
    }
  }
}
