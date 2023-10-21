const Component = require('../Component')
const LocalStorageable = require('../mixins/LocalStorageable')
const mixer = require('core/mixer')

module.exports = class Layout extends mixer.extends(Component, [LocalStorageable]) {



  onReady() {
    if (!this.container)
      throw new Error("Layout '" + this.constructor.name + "' must implement a container");
  }

  async setContent(content) {
    const oldContent = this.content

    this.content = content
    this.contentReady = false
    await this.scope.render(this.content)
    if (oldContent) {
      console.log('layout destryoing content from', this)
      this.scope.destroyChild(oldContent)
      this.container.removeChild(oldContent)
    }
    this.container.appendChild(this.content)
    this.contentReady = true

  }
}
  .define()
  .properties({
    contentReady: 'any',
  })
