const Virtual = require('../Virtual')

module.exports = class Link extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.link.href', value)


    this.el.addEventListener('click', (event) => {
      event.preventDefault()
      this.navigator.navigate(this.href)
    })

    this.on('propertyChanged:href', () => {
      this.el.href = this.href
    })

  }

  updateActive() {
    const isActive = this.href === this.navigator.url
    this.el.classList[isActive ? 'add' : 'remove']('active')
  }

  async initialized() {
    await super.initialized()
    this.navigator = this.scope.variables.navigator
    this.navigator.on('change', () => {
      console.log('change')
      this.updateActive()
    })

    this.updateActive()
  }
}
  .define({
    name: 'link'
  })
  .properties({
    href: 'any',
  })
