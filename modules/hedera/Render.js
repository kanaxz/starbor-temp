const Virtual = require('./Virtual')

const { getElementFromTemplate } = require('./utils/template')


module.exports = class Render extends Virtual {
  constructor(el, value) {
    super(el)
    const [template, args] = value.split(/ with /)
    this.el.setAttribute(':v.render.template', `${template}`)
    this.el.setAttribute(':v.render.args', `${args}`)
  }

  async onInit() {
    this.update()
  }

  preventRender(){
    return true
  }

  async update() {
    if (this.contentScope) {
      this.contentScope.destroyContent(this.el)
    }
    this.innerHTML = ''
    const scope = this.scope.parent.child({
      variables: this.args,
    })
    const template = getElementFromTemplate(this.template)
    this.el.appendChild(template)
    await scope.render(template)
    this.contentScope = scope
  }
}
  .define({
    name: 'render'
  })
  .properties({
    args: 'any',
    template: 'any',
  })
