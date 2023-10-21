const Virtual = require('../Virtual')

module.exports = class InputDelay extends Virtual {
  constructor(el, value) {
    super(el)
    this.timeout = null
    this.el.setAttribute(':v.input-delay.on-input-callback', `()=>${value}`)
    this.listen(el, 'input', this.onChange)
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
