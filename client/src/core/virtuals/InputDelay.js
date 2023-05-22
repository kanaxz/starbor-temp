const Virtual = require('../Virtual')
const renderer = require('../renderer')

module.exports = class InputDelay extends Virtual {
  constructor(el, value) {
    super(el)
    this.timeout = null
    this.el.setAttribute(':v.input-delay.on-input-callback', `()=>${value}`)
    el.addEventListener('input', this.b(this.onChange))
  }

  onChange() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.onInputCallback()
    }, 500)
  }
}
  .define({
    name: 'inputDelay'
  })
  .properties({
    onInputCallback: 'any',
  })
