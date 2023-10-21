const Layout = require('hedera/routing/Layout')
const template = require('./template.html')
const setup = require('../setup')
require('./style.scss')

Object.entries(setup.actions).forEach(([k, v]) => v.name = k)

module.exports = class ModelLayout extends Layout {

  constructor() {
    super()
    this.on('propertyChanged:model', this.b(this.onModelChanged))
  }

  async onInit() {
    await this.onModelChanged()
  }

  async onActionClicked(action) {
    if (action.url != undefined) { return }
    await action.execute(this.model)
  }

  async onModelChanged() {    
    if (!this.model) { return }
    console.log('model changed')
    const setupActions = Object.values(setup.actions).sort((a, b) => (b.position || 1) - (a.position || 1))
    console.log({ setupActions })
    const actions = []
    for (const action of setupActions) {
      if (!action.check || await action.check(this.model)) {
        actions.push(action)
      }
    }
    this.actions = actions

    this.beforeHeader = (await Promise.all(
      setup.layout.header.before.map((builder) => builder(this.model))
    ))
      .filter((o) => o)
  }
}
  .define({
    name: 'model-layout',
    template,
  })
  .properties({
    actions: 'any',
    model: 'any',
    beforeHeader: 'any',
  })