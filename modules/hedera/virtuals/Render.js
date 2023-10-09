const Virtual = require('../Virtual')
const renderer = require('../renderer')

const { getElementFromTemplate } = require('../utils/template')


module.exports = class Render extends Virtual {
  constructor(el, value) {
    super(el)
    const [args, template] = value.split(/ with /)
    this.el.setAttribute(':v.render.template', `${template}`)
    this.el.setAttribute(':v.render.args', `${args}`)
    this.on('propertyChanged', this.b(this.update))
  }

  onInit() {
    this.update()
  }

  update() {
    renderer.destroyContent(this.el)
    this.innerHTML = ''
    const scope = this.scope.parent.child({
      variables: this.args,
    })
    const template = getElementFromTemplate(this.template)
    this.el.appendChild(template)
    renderer.render(template, scope)
  }
}
  .define({
    name: 'render'
  })
  .takeControl()
  .properties({
    args: 'any',
    template: 'any',
  })
