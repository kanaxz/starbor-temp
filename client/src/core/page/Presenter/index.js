const Component = require('../../Component')
require("./style.scss")

module.exports = class Presenter extends Component {

  constructor() {
    super();
    this.currentLayout = null
    this.currentPage = null

    if (this.constructor.current)
      throw new Error("There can only have one instance of presenter")
    this.constructor.current = this
  }

  setLayout(layout) {
    if (this.currentLayout) {
      this.removeChild(this.currentLayout)
      this.currentLayout.destroy()
    }
    this.currentLayout = layout
    this.appendChild(this.currentLayout)
    return this.currentLayout.attach(this)
  }

  async display(pageInstance, layoutClass) {
    layoutClass = layoutClass || pageInstance.constructor.definition.layout;
    if (!(this.currentLayout instanceof layoutClass)) {
      await this.setLayout(new layoutClass())
    }
    await this.currentLayout.setView(pageInstance)
  }
}.define({
  name: 'ui-presenter'
})