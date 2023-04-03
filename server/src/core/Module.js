const fs = require('fs')
const { join } = require('path')

class Module {
  constructor(options) {
    this.name = options.name
    this.options = options
  }

  getRoot() {
    return this.options.parent || this
  }

  getModule(moduleName) {
    if (this.options.name === moduleName) { return this }
    const module = this.modules.find((m) => m.getModule(moduleName))
    return module
  }

  loadIndex() {
    const { path } = this.options
    const indexPath = join(path, 'index.js')
    const exist = fs.existsSync(indexPath)

    this.index = Object.assign({
      dependancies: [],
      construct: () => ({})
    }, exist && require(indexPath) || {})
  }

  loadModules() {
    const { path } = this.options
    const modulesPath = join(path, 'modules')
    const exist = fs.existsSync(modulesPath)
    if (!exist) {
      this.modules = []
      return
    }

    const ditents = fs.readdirSync(modulesPath)
    this.modules = ditents.map((d) => {
      const modulePath = join(modulesPath, d)
      const module = new Module({
        name: d,
        parent: this,
        path: modulePath,
      })

      module.load()
      return module
    })
  }

  load() {
    this.loadIndex()
    this.loadModules()
  }

  async processIndex() {
    const { dependancies, construct } = this.index
    const root = this.getRoot()
    this.dependancies = dependancies.map((dependancyName) => root.getModule(dependancyName))
    for(const dependancy of this.dependancies){
      await dependancy.process()
    }
    const params = this.dependancies.reduce((acc, dependancy) => {
      acc[dependancy.name] = dependancy.object
      return acc
    }, {})
    this.object = await construct(params)
  }

  async processModules() {
    for (const module of this.modules) {
      await module.process()
    }
  }

  async process() {
    if (this.isProcessed) { return }
    await this.processIndex()
    this.isProcessed = true
    await this.processModules()
  }
}

module.exports = Module
