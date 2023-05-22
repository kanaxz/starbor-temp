const Component = require('@core/Component')
const template = require('./template.html')
require('./style.scss')

const OFFSET = 50

module.exports = class Tooltip extends Component {
  constructor() {
    super()
    this.show = false
    this.parentElement.addEventListener('mouseenter', this.b(this.onMouseEnter))
    this.parentElement.addEventListener('mouseleave', this.b(this.onMouseLeave))
  }

  onMouseEnter() {
    this.show = true
  }

  onMouseLeave() {
    this.show = false
  }
}
  .define({
    name: 'app-tooltip',
    template,
    transclude: true,
  })
  .properties({
    show: 'any',
  })
