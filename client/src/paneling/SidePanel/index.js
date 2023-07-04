const Component = require('hedera/Component')
const template = require('./template.html')
const service = require('../service')
require('./style.scss')

module.exports = class SidePanel extends Component {
  async initialize() {
    await super.initialize()
    this.remove()
  }

  async show(fromElement) {
    await service.show(this, fromElement)
  }

  async close() {
    await service.close(this)
  }

  destroy(fromRenderer) {
    if (fromRenderer) {
      return
    }
    return super.destroy()
  }
}
  .define({
    name: 'side-panel',
    template,
    transclude: true,
  })
  .properties({
    isOpen: 'any',
  })
