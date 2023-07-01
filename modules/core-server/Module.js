const fs = require('fs')
const { join } = require('path')

class Module {
  constructor(options) {
    this.name = options.name
    this.options = options
  }

  getRoot() {
    return this.options.parent?.getRoot() || this
  }

  getModule(moduleName) {
    if (this.options.name === moduleName) { return this }
    for (const module of this.modules) {
      const child = module.getModule(moduleName)
      if (child) {
        return child
      }
    }
    return null
  }

  loadIndex() {
    const { path } = this.options

    this.index = Object.assign({
      name: this.name,
      dependancies: [],
      construct: () => ({})
    }, require(path))
    this.name = this.index.name
  }

  loadModules() {
    if (this.options.isFile) {
      this.modules = []
      return
    }
    const { path } = this.options
    const modulesPath = join(path, 'modules')
    const exist = fs.existsSync(modulesPath)
    if (!exist) {
      this.modules = []
      return
    }

    const ditents = fs.readdirSync(modulesPath, { withFileTypes: true })
    this.modules = ditents.map((d) => {
      const name = d.name.replace('.js', '')
      const modulePath = join(modulesPath, d.name)
      const module = new Module({
        isFile: d.isFile(),
        name,
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
    this.dependancies = dependancies.map((dependancyName) => {
      const module = root.getModule(dependancyName)
      if (!module) {
        throw new Error(`Module '${dependancyName}' not found from '${this.options.path}'`)
      }
      return module
    })
    for (const dependancy of this.dependancies) {
      await dependancy.process()
    }

    const params = this.dependancies.reduce((acc, dependancy) => {
      acc[dependancy.name] = dependancy.object
      return acc
    }, {})
    this.object = await construct(params)
    console.info(`Module ${this.name} processed`)
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
