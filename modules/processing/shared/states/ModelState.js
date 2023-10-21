const State = require('./State')
const { match } = require('../index')

module.exports = class ModelState extends State {

  reset(){
    super.reset()
    this.filters = []
  }

  async validate() {
    super.validate()
    if (!this.value || !this.filters.length) { return }
    await this.value.load()
    console.log('validating filters', this.value.toJSON(), JSON.stringify(this.filters, null, ' '))
    const doesMatch = await match(this.root.context, this.value, this.filters)
    if (!doesMatch) {
      this.errors.push('Value is not matching filters')
    }
  }
}
  .define()