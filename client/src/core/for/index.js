const Virtual = require('../Virtual')
const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const renderer = require('../renderer')
const It = require('./It')
const { getElementFromTemplate } = require('../utils')
const handlers = require('./handlers')

module.exports = class For extends Virtual {
  constructor(el, value) {
    super(el)
    this.iterations = null
    const [name, remaining] = value.split(/ of /)
    const [source, template] = remaining.split(/ with /)
    this.el.setAttribute(':v.for.name', `'${name}'`)
    this.el.setAttribute(':v.for.source', `${source}`)
    if (template) {
      this.el.setAttribute(':v.for.template', `${template}`)
    } else {
      this.template = [...this.el.childNodes].find((child) => child.nodeType === Node.ELEMENT_NODE)
      this.el.innerHTML = ''
    }

    this.on('propertyChanged:source', this.b(this.onSourceChanged))
  }

  async initialize() {
    await super.initialize()
    this.onSourceChanged()
  }

  async iteration(object, index) {
    const scope = this.scope.parent.child()
    scope.variables[this.name] = object
    scope.variables.index = index

    const element = getElementFromTemplate(this.template)
    const it = new It({ index, object, element, scope })

    await renderer.render(it.element, it.scope)
    this.iterations.push(it)
    return it
  }

  async onSourceChanged() {

    if (this.handler) {
      this.handler.destroy()
      this.handler = null
    }
    if (this.iterations) {
      this.iterations.forEach((it) => {
        it.destroy()
      })
    }
    this.iterations = []
    if (!this.source) { return }

    const handler = handlers.find((handler) => handler.handle(this.source))
    if (handler) {
      this.handler = new handler(this)
    } else {
      this.handler = null
    }
    for (let i = 0; i < this.source.length; i++) {
      const it = await this.iteration(this.source[i], i)
      this.el.appendChild(it.element)
    }
  }
}
  .define({
    name: 'for'
  })
  .properties({
    source: 'any',
    name: 'any',
  })
