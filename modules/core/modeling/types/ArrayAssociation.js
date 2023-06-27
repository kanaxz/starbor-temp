const Loadable = require('../mixins/Loadable')
const mixer = require('../../mixer')
const Array = require('./Array')
const Bindeable = require('../../mixins/Bindeable')
const Abstractable = require('../../mixins/Abstractable')

const additionalMixins = (globalThis || global).core?.modeling?.arrayAssociation?.mixins || []

module.exports = class ArrayAssociation extends mixer.extends(Array, [Abstractable, Loadable, Bindeable, ...additionalMixins]) {
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
    return `${this.constructor.definition.name} of ${this.owner.toString()}`
  }

  static parse(array, owner, property) {

    let instance = owner[property.name]
    if (instance && array === instance) {
      return undefined
    }
    console.log('parsing arrayAssociation', array, owner.toString(), instance)
    if (array === null) {
      return null
    }

    if (!instance) {
      instance = new this(owner, property)
    }

    if (array) {
      instance.splice(0, instance.length)
      instance.push(...array)
    }

    return instance
  }

  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }
}
  .define({
    name: 'hasMany',
    abstract: true,
  })