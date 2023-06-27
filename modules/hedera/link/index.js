const Virtual = require('../Virtual')

module.exports = class Link extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.link.href', value)

    this.el.addEventListener('click', (event) => {

      event.preventDefault()
      if (this.href) {
        this.navigator.navigate(this.href)
      }
    })

    this.on('propertyChanged:href', () => {
      this.updateHref()
    })

  }

  async initialize() {
    await super.initialize()
    this.navigator = this.scope.variables.navigator
    this.navigator.on('change', () => {
      this.updateActive()
    })

    this.updateActive()
    this.updateHref()
  }

  updateHref() {
    this.el.href = this.href || ''
  }

  updateActive() {
    const isActive = this.href === this.navigator.url
    this.el.classList[isActive ? 'add' : 'remove']('active')
  }
}
  .define({
    name: 'link'
  })
  .properties({
    href: 'any',
  })
