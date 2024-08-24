const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')
const GLTF = require('../types/models/GLTF')
const Renderable = require('./Renderable')

module.exports = mixer.mixin([Propertiable, Renderable], (base) => {
  return class GLTFable extends base { }
})
  .define()
  .properties({
    asset: {
      type: GLTF
    }
  })