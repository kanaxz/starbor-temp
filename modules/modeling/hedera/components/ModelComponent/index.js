const Component = require('hedera/Component')
const componentsService = require('../../componentsService')
const { moveAttributes } = require('hedera/utils')
const { getParent } = require('core/utils/proto')

module.exports = class ModelComponent extends Component {
  constructor(model) {
    super()
    this.model = model
    if (model && !this.parentElement) {
      const parent = getParent(this.constructor)
      if (parent === ModelComponent) {
        throw new Error('Cannot instanciate')
      }
    }

  }

  async replace(scope) {
    const parent = getParent(this.constructor)
    if (parent !== ModelComponent) { return null }
    let model = this.model
    if (!model) {
      const div = document.createElement('div')
      const modelAttribute = this.getAttribute(':model')
      if (!modelAttribute) {
        throw new Error('Cannot replace')
      }
      div.setAttribute(':model', modelAttribute)
      await scope.process(div)
      model = div.model
    }
    const typeName = this.constructor.definition.type
    if (!typeName) {
      throw new Error('Cannot replace')
    }
    const type = componentsService.get(model.constructor, typeName)
    const replace = new type(model)
    moveAttributes(this, replace)
    this.destroy()
    return replace
  }

  static register(type, name) {
    componentsService.register(type, name, this)
    return this
  }

  async attach(scope) {
    let replace = await this.replace(scope)
    if (replace) {
      if (!this.parentElement) {
        throw new Error('Cannot replace')
      }
      this.replaceWith(replace)
      return replace.attach(scope)
    }

    return super.attach(scope)
  }

  async onReady() {
    await this.update()
  }

  async update() {
    if (!this.model) { return }
    await this.model.load()
  }


}
  .define()
  .properties({
    model: 'any',
  })
