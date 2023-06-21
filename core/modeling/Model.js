const mixer = require('../mixer')
const Object = require('./Object')
const Loadable = require('./mixins/Loadable')
const SingleInstance = require('./mixins/SingleInstance')
const Bool = require('./types/Bool')
const Indexable = require('./mixins/Indexable')
const Holdable = require('../mixins/Holdable')
const String = require('./types/String')

const additionalMixins = []
if (!global.MODEL_DISABLE_FRONT_MIXINS) {
  additionalMixins.push(Holdable, SingleInstance)
}

module.exports = class Model extends mixer.extends(Object, [...additionalMixins, Loadable, Indexable]) {
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
      throw new Error()
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