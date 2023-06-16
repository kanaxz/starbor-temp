const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

const OFFSET = 50

module.exports = class Tooltip extends Component {
  constructor() {
    super()
    this.show = false
    this.listen(this.parentElement, 'mouseenter', this.onMouseEnter)
    this.listen(this.parentElement, 'mouseleave', this.onMouseLeave)
  }

  onMouseEnter() {
    this.show = true
  }

  onMouseLeave() {
    this.show = false
  }
}
  .define({
    name: 'tool-tip',
    template,
    transclude: true,
  })
  .properties({
    show: 'any',
  })
