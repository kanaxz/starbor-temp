const State = require('./State')

module.exports = class ModelState extends State {
  reset() {
    super.reset()
    this.filters = []
  }

  async validate() {
    super.validate()
    if (!this.value || !this.filters.length) { return }
    await this.value.load()
    const match = await this.value.match(this.root.context, this.filters)
    if (!match) {
      this.errors.push('Value is not matching filters')
    }
  }
}
  .define()