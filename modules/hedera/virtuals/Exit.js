const Virtual = require('../Virtual')

module.exports = class Exit extends Virtual {
  constructor(el, value) {
    super(el)
    this.el.setAttribute(':v.exit.callback', `()=>${value}`)
    this.listen(window, 'click', this.onWindowClicked)
    this.listen(window, 'keydown', this.onWindowKeyDown)
  }

  onWindowKeyDown(e) {
    if (e.key === "Escape") {
      this.trigger()
    }
  }

  onWindowClicked(e) {
    if (!this.el.contains(e.target)) {
      this.trigger()
    }
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
