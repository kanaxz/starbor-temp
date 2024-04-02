const Layout = require('hedera/routing/Layout')
const template = require('./template.html')
const setup = require('../setup')
require('./style.scss')


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
    const setupActions = Object.values(setup.actions).sort((a, b) => (b.position || 1) - (a.position || 1))
    const actions = []
    for (const action of setupActions) {
      try {
        await action?.check(this.model)
        actions.push(action)
      } catch (err) {

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