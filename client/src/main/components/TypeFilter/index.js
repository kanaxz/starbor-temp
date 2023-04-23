const Component = require('@core/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class TypeFilter extends Component {
  constructor() {
    super()
    this.filters = []
  }

  getFilters() {
    return []
  }

}
  .define({
    name: 'app-type-filter',
    template,
  })
  .properties({
    type: 'any',
    filters: 'any',
  })
