const mixer = require('../../mixer')
const ArrayAssociation = require('./ArrayAssociation')

module.exports = class HasMany extends mixer.extends(ArrayAssociation) {

  async innerLoad(paths = {}) {
    await this.owner.load()
    const path = `$${this.property.on}._id`
    const models = await this.constructor.definition.template.collection.find([{
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