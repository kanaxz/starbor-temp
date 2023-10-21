const Module = require("./Module");

module.exports = class AppModule extends Module {
  async start() {
    this.load()
    this.loadAfter()
    await this.process()
    const core = this.getModule('core')
    await core.object.onReady.trigger({
      setup: true
    })
  }
}