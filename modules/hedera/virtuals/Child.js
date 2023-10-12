const Virtual = require('../Virtual')
const renderer = require('../renderer')

module.exports = class Child extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.child.node', value)
    this.on('propertyChanged:node', this.b(this.update))
  }

  onInit() {
    this.update()
  }

  update() {
    console.log('updated', this, this.node)
    renderer.destroyContent(this.el)
    this.el.innerHTML = ''
    if (!this.node) { return }
    this.el.appendChild(this.node)
    renderer.renderContent(this.el, this.scope.parent)
  }
}
  .define({
    name: 'child'
  })
  .properties({
    node: 'any',
  })
  .takeControl()
