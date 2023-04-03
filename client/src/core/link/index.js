const Virtual = require('../Virtual')

module.exports = class Link extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.link.href', value)
    window.addEventListener('popstate', () => {

    })

    this.on('propertyChanged:href', () => {
      this.el.href = this.href
    })
  }

}
  .define({
    name: 'link'
  })
  .properties({
    href: 'any',
  })
