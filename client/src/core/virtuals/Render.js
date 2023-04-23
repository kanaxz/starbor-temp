const Virtual = require('../Virtual')
const renderer = require('../renderer')

const { getElementFromTemplate } = require('../utils')


module.exports = class Render extends Virtual {
  constructor(el, value) {
    super(el)
    const [template, args] = value.split(/ with /)
    this.el.setAttribute(':v.render.template', `${template}`)
    this.el.setAttribute(':v.render.args', `${args}`)
    this.on('propertyChanged', this.b(this.update))
  }

  initialize() {
    this.update()
    return super.initialize()
  }

  async update() {
    renderer.destroyContent(this.el)
    this.innerHTML = ''
    const scope = this.scope.parent.child({
      variables: this.args,
    })
    const template = getElementFromTemplate(this.template)
    this.el.appendChild(template)
    await renderer.render(template, scope)
  }
}
  .define({
    name: 'render'
  })
  .properties({
    args: 'any',
    template: 'any',
  })
