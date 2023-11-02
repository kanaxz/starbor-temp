const Loadable = require('../mixins/Loadable')
const mixer = require('core/mixer')
const Array = require('./Array')
const Bindeable = require('core/mixins/Bindeable')
const Abstractable = require('core/mixins/Abstractable')
const setup = require('../setup')
const config = setup.arrayAssociation

class BaseArrayAssociation extends mixer.extends(Array, [Abstractable, Loadable, Bindeable, ...config.before]) {
  constructor(owner, property) {
    /*
  * when using native array functions like map, filter etc, it will return an instance of the current array class, which branch in this case
  * So we add this check to return a native array if the required parameters are not passed
*/
    if (!owner || !property) {
      return []
    }
    super()
    this.owner = owner
    this.property = property
  }

  toString() {
    return `${this.property.name} of ${this.owner.toString()}`
  }

  static parse(array, owner, property) {
    let instance = owner[property.name]
    if (!instance) {
      instance = new this(owner, property)
    }

    if (array) {
      instance.splice(0, instance.length)
      instance.push(...array)
    }

    return instance
  }

  async loadAssociation(context, property, paths) {
    for (const model of this) {
      await model[property].load(context, paths)
    }
  }

  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }

  unload() {
    instance.splice(0, instance.length)
    super.unload()
  }
}

BaseArrayAssociation.define()



module.exports = class ArrayAssociation extends mixer.extends(BaseArrayAssociation, config.after) {

}
  .define({
    name: 'hasMany',
    abstract: true,
  })