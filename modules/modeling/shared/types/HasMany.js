const mixer = require('core/mixer')
const ArrayAssociation = require('./ArrayAssociation')

module.exports = class HasMany extends mixer.extends(ArrayAssociation) {

  async innerLoad(context, paths = {}) {
    await this.owner.load(context)
    const path = `$${this.property.on}._id`
    const models = await this.constructor.definition.template.collection.find(context, [{
      $eq: [path, this.owner._id]
    }], {
      load: paths,
    })
    this.push(...models)
  }
}
  .define({
    name: 'hasMany',
  })