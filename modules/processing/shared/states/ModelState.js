const State = require('./State')
const { match } = require('../index')

module.exports = class ModelState extends State {

  constructor(values) {
    super({
      filters: [],
      ...values,
    })
  }


  async validate() {
    super.validate()
    if (!this.value || !this.filters.length) { return }
    await this.value.load()
    console.log('validating filters', this.value.toJSON(), JSON.stringify(this.filters, null, ' '))
    const match = await match(this.root.context, this.filters)
    if (!match) {
      this.errors.push('Value is not matching filters')
    }
  }
}
  .define()