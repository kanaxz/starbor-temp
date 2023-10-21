const mixer = require('core/mixer')
const ObjectType = require('./Object')
const Loadable = require('../mixins/Loadable')
const Bool = require('./Bool')
const Indexable = require('../mixins/Indexable')
const String = require('./String')
const Controlleable = require('../controlling/Controlleable')
const setup = require('../setup')
const This = require('./This')
const config = setup.model

class BaseModel extends mixer.extends(ObjectType, [Controlleable, Loadable, Indexable, ...config.before]) {

  static async buildAndLoad(values){
    const model = this.parse(values)
    await model.load()
    return model
  }

  async innerLoad(context, paths) {
    const index = this.getFirstUniqueIndex()
    if (!index) {
      console.error(this)
      throw new Error('Could not load')
    }

    const [result] = await this.constructor.collection.find(context, [
      index
    ], {
      type: this.constructor.definition.name,
      limit: 1,
      load: paths,
    })

    if (!result) {
      throw new Error(`Could not load ${this.constructor.definition.name} with index ${JSON.stringify(index)} `)
      this.transform(null)
      return
    }
    Object.assign(this, result)
  }

  // we do nothing ..
  unload() {

  }

  toJSON(paths = {}, context) {
    if (paths) {
      return super.toJSON(paths, context)
    }
    const index = this.getIndex('id')
    if (!index) {
      console.error(this.toJSON())
      throw new Error('Could not toJSON')
    }
    return {
      '@type': this.constructor.definition.name,
      ...index,
    }
  }

  toString() {
    return this._id
  }
}

class Model extends mixer.extends(BaseModel, config.after) {

}

module.exports = Model
  .define({
    name: 'model',
    abstract: true,
  })
  .indexes({
    id: {
      properties: ['_id'],
      unique: true,
      build: false,
    }
  })
  .properties({
    _id: {
      type: String,
      state: {
        disabled: true,
      }
    },
  })
  .methods({
    eq: [[This], Bool]
  })