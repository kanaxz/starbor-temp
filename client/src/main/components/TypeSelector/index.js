const Component = require('@core/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class TypeSelector extends Component {
  async initialized() {
    super.initialized()
    if (!this.current) {
      this.current = this.type
    }
    window.addEventListener('click', (event) => {
      if (!this.contains(event.target)) {
        this.open = false
      }
    })
  }

  setCurrent(model) {
    this.current = model
    this.event('change', model)
  }
}
  .properties({
    type: 'any',
    current: 'any',
    open: 'any',
  })
  .define({
    name: 'app-type-selector',
    template,
  })