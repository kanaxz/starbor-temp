const Virtual = require('../Virtual')

module.exports = class Child extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.child.node', value)
    this.on('propertyChanged:node', this.b(this.update))
  }

  async onInit() {
    await this.update()
  }

  async update() {
    this.processedOnce = true
    if (this.processedOnce) {
      this.scope.destroyContent(this.el)
      this.el.innerHTML = ''
    }
    this.processedOnce = true
    if (!this.node) { return }
    this.el.appendChild(this.node)
    await this.scope.renderContent(this.el)
  }

  preventRender(){
    return true
  }
}
  .define({
    name: 'child'
  })
  .properties({
    node: 'any',
  })
