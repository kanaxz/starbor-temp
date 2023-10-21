const Virtual = require('./Virtual')

const { getElementFromTemplate } = require('./utils/template')


module.exports = class Render extends Virtual {
  constructor(el, value) {
    super(el)
    const [args, template] = value.split(/ with /)
    this.el.setAttribute(':v.render.template', `${template}`)
    this.el.setAttribute(':v.render.args', `${args}`)
    this.on('propertyChanged', this.b(this.update))
  }

  async onInit() {
    this.update()
  }

  async update() {
    if(this.contentScope){
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
  .takeControl()
  .properties({
    args: 'any',
    template: 'any',
  })
