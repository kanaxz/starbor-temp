const Virtual = require('../Virtual')

module.exports = class Exit extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.exit.callback', `()=>${value}`)
    window.addEventListener('click', (e) => {
      if (!this.el.contains(e.target)) {
        this.trigger()
      }
    })
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        this.trigger()
      }
    })
  }

  trigger() {
    this.callback()
  }
}
  .define({
    name: 'exit'
  })
  .properties({
    callback: 'any',
  })
