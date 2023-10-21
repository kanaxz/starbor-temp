const Component = require('hedera/Component')
const template = require('./template.html')
const Array = require('core/types/Array')
const ExplorerModelPanel = require('./panels/ExplorerModelPanel')
require('./style.scss')


module.exports = class ModelExplorerPage extends Component {
  constructor(model) {
    super()
    this.model = model
    this.panels = new Array()
    this.panels.push(new ExplorerModelPanel(this, this.model))
  }

  open(from, panel) {
    const index = this.panels.indexOf(from)
    this.panels.splice(index + 1, this.panels.length)
    this.panels.push(panel)
  }
}
  .define({
    name: 'model-explorer-page',
    template,
  })
  .properties({

  })