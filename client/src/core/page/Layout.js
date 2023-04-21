const Component = require('@core/Component')
const renderer = require('@core/renderer')
const LocalStorageable = require('@core/mixins/LocalStorageable')
const mixer = require('@shared/core/mixer')

module.exports = class Layout extends mixer.extends(Component, [LocalStorageable()]) {
  initialized() {
    if (!this.container)
      throw new Error("Layout '" + this.constructor.name + "' must implement a container");
    return super.initialized();
  }

  async setView(view) {
    const oldView = this.currentView
    if (oldView) {
      this.container.removeChild(oldView)
    }
    this.currentView = view
    this.container.appendChild(this.currentView)
    await this.currentView.attach(this)
    if (oldView) {
      renderer.destroy(oldView)
    }
  }
}
