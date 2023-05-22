const Component = require('@core/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class Loader extends Component {
  constructor() {
    super()
    this.loading = false
  }
}
  .define({
    name: 'app-loader',
    template,
    transclude: true,
  })
  .properties({
    loading: 'any',
    size: 'any',
  })
