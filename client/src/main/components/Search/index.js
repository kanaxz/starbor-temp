const Component = require('@core/Component')
const template = require('./template.html')
const Filter = require('./Filter')
require('./style.scss')


module.exports = class Search extends Component {
  constructor() {
    super()
    this.filters = [
      new Filter({ name: 'name', functionName: '=', value: 'aegis' })
    ]
  }
}
  .properties({

  })
  .define({
    name: 'app-search',
    template,
  })