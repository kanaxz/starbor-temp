const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class Loader extends Component {
  constructor() {
    super()
    this.loading = true
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
