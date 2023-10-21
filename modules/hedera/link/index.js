const Virtual = require('../Virtual')
const { navigator } = require('../global')

module.exports = class Link extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.link.href', value)

    this.el.addEventListener('click', (event) => {

      event.preventDefault()
      if (this.href) {
        navigator.navigate(this.href)
      }
    })

    this.on('propertyChanged:href', () => {
      this.updateHref()
    })
  }

  onInit() {
    navigator.on('change', () => {
      this.updateActive()
    })

    this.updateActive()
    this.updateHref()
  }

  updateHref() {
    this.el.href = this.href || ''
  }

  updateActive() {
    const isActive = this.href === navigator.currentUrl
    this.el.classList[isActive ? 'add' : 'remove']('active')
  }
}
  .define({
    name: 'link'
  })
  .properties({
    href: 'any',
  })
