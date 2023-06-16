const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class TypeSelector extends Component {
  async initialized() {
    super.initialized()
    if (!this.current) {
      this.current = this.type
    }
  }

  setCurrent(model) {
    this.current = model
    this.event('change', model)
  }
}
  .define({
    name: 'app-type-selector',
    template,
  })
  .properties({
    type: 'any',
    current: 'any',
    open: 'any',
  })
