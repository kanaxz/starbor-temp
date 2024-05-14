const mixer = require('core/mixer')
const ObjectType = require('./Object')
const Loadable = require('../mixins/Loadable')
const setup = require('../setup')
const ModelMixin = require('./ModelMixin')
const { objectToFilter } = require('../processing/utils')
const config = setup.model


class BaseModel extends mixer.extends(ObjectType, [ModelMixin, Loadable, ...config.before]) {

  setPathsState(state, paths, err) {
    for (const [propertyName, value] of Object.entries(paths)) {
      if (value && this[propertyName]) {
        this[propertyName].setState(state, value, err)
      }
    }
  }

  handleLoadResult(model) {
    if (model) {
      Object.assign(this, model)
    } else {
      console.warn(`Model ${this.constructor.definition.name} not found`, this._id)
    }
  }

  async loadAssociation(context, propertyName, paths) {
    if (!this[propertyName]) {
      return
    }

    await this[propertyName].load(context, paths)
  }

  async innerLoad(context, paths) {
    const index = this.getFirstUniqueIndex()
    if (!index) {
      console.error(this)
      throw new Error('Could not load')
    }

    const result = await this.constructor.collection.findOne(
      context,
      objectToFilter(index)
      , {
        type: this.constructor.definition.name,
        load: paths,
      })

    return this.handleLoadResult(result)
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

  async apply(...args) {
    const [context, $set] = setup.getArgs(args)
    return this.constructor.collection.update(context, [{
      $eq: ['$_id', this._id],
    }], {
      $set
    })
  }

  toString() {
    return this._id
  }
}

BaseModel.define()

class Model extends mixer.extends(BaseModel, [ModelMixin, ...config.after]) {

}

module.exports = Model
  .define({
    name: 'model',
    abstract: true,
  })