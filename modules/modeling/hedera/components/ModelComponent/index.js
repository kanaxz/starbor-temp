const { components: { Interface } } = require('hedera/global')
const componentsService = require('../../componentsService')
const { moveAttributes } = require('hedera/utils')
const { getParent } = require('core/utils/proto')

module.exports = class ModelComponent extends Interface {
  constructor(model, type) {
    super()
    this.classList.add('interactable')
    Object.assign(this, {
      model,
      type
    })
  }

  async replace(scope) {
    if (this.constructor !== ModelComponent) { return null }

    let infos = this
    if (!infos.model || !infos.type) {
      const div = document.createElement('div')
      for (const attributeName of ['model', 'type']) {
        const attribute = this.getAttribute(`:${attributeName}`)
        if (!attribute) {
          throw new Error('Cannot replace')
        }
        div.setAttribute(`:${attributeName}`, attribute)
      }

      await scope.process(div)
      infos = div
    }
    if (!infos.model || !infos.type) {
      return null
    }
    const type = componentsService.get(infos.model.constructor, infos.type)
    const replace = new type()
    moveAttributes(this, replace, ['type'])
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
    await super.onReady()
    await this.update()
  }

  async update() {
    if (!this.model) { return }
    await this.model.load()
  }


}
  .define({
    name: 'model-component',
  })
  .properties({
    model: 'any',
  })
