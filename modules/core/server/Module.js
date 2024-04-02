const fs = require('fs')
const { join } = require('path')
const moment = require('moment')

class Module {
  constructor(options) {
    this.name = options.name
    this.options = options
    this.afters = []
  }

  getRoot() {
    return this.options.parent?.getRoot() || this
  }

  getModule(moduleName) {
    if (this.name === moduleName) { return this }
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
      dependencies: [],
      construct: () => ({})
    }, require.main.require(path))
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

  loadBundles() {
    const bundles = this.options.bundles
    if (!bundles?.length) { return }
    const bundlesModules = bundles.map((path) => {
      const module = new Module({
        isFile: false,
        parent: this,
        path: join(this.options.node_modules, path),
      })

      module.load()
      return module
    })
    this.modules.push(...bundlesModules)
  }

  load() {
    this.loadIndex()
    this.loadModules()
    this.loadBundles()
  }

  async processIndex() {
    const { dependencies, construct } = this.index
    const root = this.getRoot()

    this.dependencies = dependencies.map((dependancyName) => {
      const module = root.getModule(dependancyName)
      if (!module) {
        throw new Error(`Module '${dependancyName}' not found from '${this.options.path}'`)
      }
      return module
    })
    for (const dependancy of this.dependencies) {
      await dependancy.process()
    }

    this.dependenciesObject = this.dependencies.reduce((acc, dependancy) => {
      acc[dependancy.name] = dependancy.object
      return acc
    }, {})
    this.object = await construct(this.dependenciesObject, root.options.config)
    console.info(`Module ${this.name} processed`)
  }

  async processModules() {
    for (const module of this.modules) {
      await module.process(true)
    }
  }

  async loadAfter() {
    const { after } = this.index
    if (after) {
      const module = this.getRoot().getModule(after)
      module.afters.push(this)
    }
    for (const module of this.modules) {
      module.loadAfter()
    }
  }

  async process(processChilds = false) {
    if (!this.isProcessed) {
      await this.processIndex()
      this.isProcessed = true

      for (const after of this.afters) {
        await after.process()
      }
    }

    if (processChilds) {
      await this.processModules()
    }
  }
}

module.exports = Module
