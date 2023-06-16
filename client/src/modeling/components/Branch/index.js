const Component = require('hedera/Component')
const template = require('./template.html')
const componentsService = require('../../../main/componentsService')
require('./style.scss')



module.exports = class Branch extends Component {
  constructor() {
    super()
    this.on('propertyChanged:branch', this.b(this.update))
  }

  initialize() {
    this.update()
    return super.initialize()
  }

  template(model) {
    const rowComponent = componentsService.get(model.constructor, 'row')
    return new rowComponent(model)
  }

  async update() {
    this.loading = true
    await this.branch.load()
    this.loading = false
  }
}
  .define({
    name: 'model-branch',
    template,
  })
  .properties({
    branch: 'any',
    loading: 'any',
  })
