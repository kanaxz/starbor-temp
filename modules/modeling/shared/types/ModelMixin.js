const mixer = require('core/mixer')
const Bool = require('./Bool')
const String = require('./String')
const This = require('./This')
const Any = require('./Any')
const Indexable = require('../mixins/Indexable')

module.exports = mixer.mixin([Any, Indexable], (base) => {
  return class ModelMixin extends base { }
})
  .define({
    name: 'modelMixin',
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