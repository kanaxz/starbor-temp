const State = require('./State')
const { match } = require('../processing/index')

module.exports = class ModelState extends State {

  reset() {
    super.reset()
    this.filters = []
  }

  async validate() {
    super.validate()
    if (!this.value || !this.filters.length) { return }
    await this.value.load()
    const doesMatch = await match(this.root.context, this.value, [{ filter: this.filters }])
    if (!doesMatch) {
      this.errors.push('Value is not matching filters')
    }
  }
}
  .define()