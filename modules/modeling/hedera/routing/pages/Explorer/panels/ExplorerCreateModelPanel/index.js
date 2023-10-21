const template = require('./template.html')
const ExplorerPanel = require('../ExplorerPanel')
require('./style.scss')


module.exports = class ExplorerCreateModelPanel extends ExplorerPanel {
  constructor(page, property) {
    super(page)
    this.property = property
    this.title = `Creating ${property.name} ${property.type.definition.name}`
  }

  async onInit() {
   
  }
}
  .define({
    name: 'explorer-create-model-panel',
    template,
  })