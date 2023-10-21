const Component = require('../Component')
const Scope = require('../Scope')
const Layout = require('./Layout')
const RootRouter = require("./routers/RootRouter")

module.exports = class Root extends Layout {
  constructor() {
    super()
    this.router = new RootRouter(this)
  }

  async start(variables) {
    const scope = new Scope({ source: this, variables })
    await this.process(scope)
  }

  async loadLayouts(req, layouts) {
    let current = this
    for (let layoutType of layouts) {
      let args = {}
      if (!(layoutType.prototype instanceof Layout)) {
        layoutType = layoutType(req)
      }
      if (layoutType instanceof Array) {
        args = layoutType[1]
        layoutType = layoutType[0]
      }
      layoutType = await layoutType
      if (layoutType.default) {
        layoutType = layoutType.default
      }
      if (!(current.content instanceof layoutType)) {
        console.log({layoutType})
        const layout = new layoutType()
        Object.assign(layout, args)
        await current.setContent(layout)
      } else {
        Object.assign(current.content, args)
      }
      current = current.content
    }
    return current
  }

  async setPage(req, layouts, pageImport, args) {
    const bottomLayout = await this.loadLayouts(req, layouts)
    const pageModule = await pageImport
    const pageType = pageModule.default
    const page = new pageType(...args)
    await bottomLayout.setContent(page)
  }
}.define()