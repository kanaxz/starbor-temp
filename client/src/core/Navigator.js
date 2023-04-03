const Router = require('@core/Router')

module.exports = class Navigator extends Router {
  constructor() {
    super()
    this.root = new Router()
  }

  async start() {

    this.root.use(this)

    window.addEventListener('popstate', async () => {
      await this.processCurrent()
    })

    await this.processCurrent()
  }

  async processCurrent() {
    this.url = window.location.pathname
    await this.root.execute()
    await this.emit('change')
  }

  async navigate(url, replaceState) {
    history[replaceState ? "replaceState" : "pushState"]({}, '', url)
    await this.processCurrent()
  }
}
