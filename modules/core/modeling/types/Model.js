const mixer = require('../../mixer')
const Object = require('./Object')
const Loadable = require('../mixins/Loadable')
const Bool = require('./Bool')
const Indexable = require('../mixins/Indexable')
const String = require('./String')
const Controlleable = require('../controlling/Controlleable')

const additionalMixins = (globalThis || global).core?.modeling?.model?.mixins || []

module.exports = class Model extends mixer.extends(Object, [...additionalMixins, Controlleable, Loadable, Indexable]) {
  async innerLoad(paths) {
    const index = this.getFirstUniqueIndex()
    if (!index) {
      console.error(this)
      throw new Error('Could not load')
    }
    const [result] = await this.constructor.collection.find([
      index
    ], {
      type: this.constructor.definition.name,
      limit: 1,
      load: paths,
    })
    if (!result) {
      throw new Error(`Could not load ${this.constructor.definition.name} with index ${JSON.stringify(index)} `)
    }
  }

  toJSON(paths = {}, context) {
    if (paths) {
      return super.toJSON(paths, context)
    }
    const index = this.getIndex('main')
    if (!index) {
      console.error(this)
      throw new Error('Could not toJSON')
    }
    return {
      '@type': this.constructor.definition.name,
      ...index,
    }
  }
}
  .define({
    name: 'model',
    abstract: true,
  })
  .indexes({
    main: {
      properties: ['_id'],
      unique: true,
    }
  })
  .properties({
    _id: String,
  })
  .methods({
    eq: [[THIS], Bool]
  })