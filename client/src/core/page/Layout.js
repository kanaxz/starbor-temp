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
    if (this.currentView) {
      this.container.removeChild(this.currentView)
      renderer.destroy(this.currentView)
    }
    this.currentView = view
    this.container.appendChild(this.currentView)
    await this.currentView.attach(this)
  }
}
