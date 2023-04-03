const Virtual = require('../Virtual')
const Propertiable = require('@shared/core/Propertiable')
const mixer = require('@shared/core/mixer')
const renderer = require('../renderer')

const { getElementFromTemplate } = require('../utils')


class It extends mixer.extends([Propertiable()]) {
  constructor(values) {
    super()
    Object.assign(this, values)
  }
}

It.properties({
  index: 'number',
})

module.exports = class For extends Virtual {
  constructor(el, value) {
    super(el)
    const [name, iterator, source] = value.split(' ')
    this.el.setAttribute(':v.for.name', `'${name}'`)
    this.el.setAttribute(':v.for.source', `${source}`)
    this.on('propertyChanged:source', this.b(this.onSourceChanged))

    this.template = [...this.el.childNodes].find((child) => child.nodeType === Node.ELEMENT_NODE)
    this.el.innerHTML = ''
  }

  async onSourceChanged() {
    if (this.iterations) {
      this.iterations.forEach((it) => {
        it.element.remove()
      })
    }
    if (!this.source) { return }
    this.iterations = this.source.map((object, index) => {
      const scope = this.scope.parent.child()
      scope.variables[this.name] = object
      scope.variables.index = index

      const element = getElementFromTemplate(this.template)
      const it = new It({ index, object, element, scope })
      return it
    })

    for (const it of this.iterations) {
      console.log(it.element)
      this.el.appendChild(it.element)
      await renderer.render(it.element, it.scope)
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
