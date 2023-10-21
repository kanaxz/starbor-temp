const { components: { Loader } } = require('../global')
const Virtual = require('../Virtual')

module.exports = class LoaderVirtual extends Virtual {
  constructor(el, value, { handle }) {
    super(el)
    this.handle = handle
    const [isLoading, size] = value.split(/ size /)
    this.el.setAttribute(':v.loader.is-loading', isLoading)
    this.el.setAttribute(':v.loader.size', size)
    this.on('propertyChanged', this.b(this.update))
    this.loader = new Loader()
  }

  async onInit() {
    await this.scope.render(this.loader)
    this.update()
  }

  update() {
    this.loader.size = this.size
    if (this.isLoading) {
      this.el.appendChild(this.loader)
    } else if(this.loader.parentElement === this.el) {
      this.el.removeChild(this.loader)
    }
  }
}
  .define({
    name: 'loader'
  })
  .properties({
    isLoading: 'any',
    size: 'any',
  })
