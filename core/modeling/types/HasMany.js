const Loadable = require('../mixins/Loadable')
const mixer = require('../../mixer')
const Array = require('./Array')
const Bindeable = require('../../mixins/Bindeable')

module.exports = class HasMany extends mixer.extends(Array, [Loadable, Bindeable]) {
  constructor(owner, property) {
    super()
    /*
      * when using native array functions like map, filter etc, it will return an instance of the current array class, which branch in this case
      * So we add this check to return a native array if the required parameters are not passed
    */
    if (!owner || !property) {
      return []
    }
    this.owner = owner
    this.property = property
  }

  static parse(array, owner, property) {
    let instance = owner[property.name]
    if (!instance) {
      instance = new this(owner, property)
    }

    if (array) {
      instance.length = 0
      instance.push(...array)
    }

    return instance
  }

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




  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }

  destroy() {
    super.destroy()
  }
}
  .define({
    name: 'hasMany',
  })