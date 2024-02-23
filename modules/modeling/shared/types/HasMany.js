const mixer = require('core/mixer')
const { hasMany } = require('../setup')
const VirtualArrayAssociation = require('./VirtualArrayAssociation')
module.exports = class HasMany extends mixer.extends(VirtualArrayAssociation, hasMany.before) {

  async innerLoad(context, paths = {}) {
    await this.owner.load(context)
    const type = this.constructor.definition.template
    const { on } = this.property
    const targetProperty = type.properties.find((p) => p.name === on)
    let filter
    if (targetProperty.type.prototype instanceof Array) {
      filter = [
        {
          $some: [`$${on}`, [['model'], [{
            $eq: ['$model', this.owner._id]
          }]]]
        }
      ]
    } else {
      const path = `$${on}._id`
      filter = [{
        $eq: [path, this.owner._id]
      }]
    }
    const models = await type.collection.find(context, filter, {
      load: paths,
    })
    this.push(...models)
  }
}
  .define({
    name: 'hasMany',
  })