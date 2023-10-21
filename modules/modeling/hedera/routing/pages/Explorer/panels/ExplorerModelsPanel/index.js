const template = require('./template.html')
const ExplorerPanel = require('../ExplorerPanel')
const componentsService = require('../../../../../componentsService')
require('./style.scss')


module.exports = class ExplorerModelsPanel extends ExplorerPanel {
  constructor(page, models, title) {
    super(page)
    this.models = models
    this.title = title
  }

  onInit() {

  }

  template(model) {
    const type = componentsService.get(model.constructor, 'row')
    return new type(model)
  }

  async onReady() {
    await this.models.load()
  }

  openModel(model) {
    this.page.open(this, new ExplorerModelsPanel.ExplorerModelPanel(this.page, model))
  }

}
  .define({
    name: 'explorer-models-panel',
    template,
  })