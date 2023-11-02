const Virtual = require('../Virtual')

module.exports = class If extends Virtual {

  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.if.condition', value)
    this.on('propertyChanged:condition', this.b(this.onConditionChanged))
  }

  async onInit() {
    this.parent = this.el.parentElement
    this.position = [...this.parent.childNodes].indexOf(this.el)
    await this.onConditionChanged()
  }

  async onConditionChanged() {
    if (this.condition) {
      // already in the dom
      await this.scope.parent.render(this.el)
      if (this.el.parentElement) { return }
      this.parent.insertBefore(this.el, this.parent.childNodes[this.position])
    } else {
      this.el.remove()
    }
  }

  preventRender(){
    return !this.condition
  }
}
  .define({
    name: 'if'
  })
  .properties({
    condition: 'any',
  })
