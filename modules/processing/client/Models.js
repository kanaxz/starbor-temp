const { Array, Model, Template } = require('modeling/types')
const setup = require('modeling/setup')
const mixer = require('core/mixer')
const Destroyable = require('core/mixins/Destroyable')
const { match } = require('processing')
const context = require('core-client/context')

const instances = []

module.exports = class Models extends mixer.extends(Array, [Destroyable, ...setup.arrayAssociation.before]) {
  static instances = instances
  constructor(values, queryParams) {
    if (!queryParams) {
      return []
    }
    super(...values)
    this.queryParams = queryParams
    instances.push(this)
  }

  async onModelUpdated(model) {
    const isInsanceOfTemplate = model instanceof this.constructor.definition.template
    if (!isInsanceOfTemplate) { return }
    if (await match(context, model, this.queryParams.query)) {
      this.push(model)
    }
  }

  destroy() {
    const index = instances.indexOf(this)
    instances.splice(index, 1)
    super.destroy()
  }
}
  .define()
