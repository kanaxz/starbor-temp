const Component = require('hedera/Component')
const template = require('./template.html')
const componentsService = require('../../componentsService')
require('./style.scss')

module.exports = class ModelSearch extends Component {
  constructor() {
    super()
  }

  onChange() {
    try {
      const query = eval(this.input.value)

    } catch (err) {
       
    }
  }

  template(result) {
    const componentType = componentsService.get(result.constructor, 'card')
    return new componentType(result)
  }
}
  .define({
    name: 'model-search',
    template,
  })
  .properties({
    results: 'any',
    open: 'any',
    length: 'any',
    type: 'any',
  })
