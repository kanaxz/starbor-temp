const Component = require('hedera/Component')
const template = require('./template.html')
const { bound } = require('core/utils/number')

require('./style.scss')

module.exports = class WheelSelect extends Component {


  constructor() {
    super()
    this.on('propertyChanged:option', this.b(this.update))
  }

  onInit() {
    this.index = 0
    if (!this.option) {
      this.option = this.options[0]
    }
    this.update()
  }

  update() {
    this.index = this.options.indexOf(this.option)
  }

  setOption(option) {
    this.option = option
    this.event('changed', { option })
  }

  onWheel(event) {
    event.preventDefault()
    let index = this.index
    index += event.deltaY > 0 ? 1 : -1
    index = bound(index, [0, this.options.length - 1])
    this.setOption(this.options[index])
  }
}
  .define({
    name: 'wheel-select',
    template,
  })
  .properties({
    options: 'any',
    option: 'any',
    index: 'any',
  })
