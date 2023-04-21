const Virtual = require('../Virtual')
const renderer = require('../renderer')

module.exports = class Child extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.child.node', `${value}`)
    this.on('propertyChanged', this.b(this.update))
  }

  async initialize() {
    await super.initialize()
    await this.update()
  }

  async update() {
    renderer.destroyContent(this.el)
    this.el.innerHTML = ''
    this.el.appendChild(this.node)
    await renderer.renderContent(this.el, this.scope.parent)
  }
}
  .define({
    name: 'child'
  })
  .properties({
    node: 'any',
  })
