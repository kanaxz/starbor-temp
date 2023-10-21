const template = require('./template.html')
const { Model, ArrayAssociation } = require('modeling/types')
const ExplorerPanel = require('../ExplorerPanel')
const ExplorerModelsPanel = require('../ExplorerModelsPanel')
const ExplorerCreateModelPanel = require('../ExplorerCreateModelPanel')
require('./style.scss')

const map = [
  [ArrayAssociation, ExplorerModelsPanel]
]

class ExplorerModelPanel extends ExplorerPanel {
  constructor(page, model) {
    super(page)
    this.model = model
    this.title = this.model.title
  }

  async onInit() {
    await this.model.load()
    this.properties = this.model.constructor.properties
      .filter((p) => {
        return map.find(([t]) => p.type.prototype instanceof t)
      })
  }

  openProperty(property) {
    const value = this.model[property.name]
    let panel
    if (value) {
      const [, panelType] = map.find(([t]) => value instanceof t)
      panel =new panelType(this.page, value, property.name)
    } else {
      panel = new ExplorerCreateModelPanel(this.page, property)
    }
    this.page.open(this, panel)
  }

}

map.push([Model, ExplorerModelPanel])
ExplorerModelsPanel.ExplorerModelPanel = ExplorerModelPanel
module.exports = ExplorerModelPanel
  .define({
    name: 'explorer-model-panel',
    template,
  })