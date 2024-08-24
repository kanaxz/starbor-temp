const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')
const Renderable = require('./Renderable')
const { Image } = require('storage')
const { Number } = require('sools-modeling/types')
const Orbitable = require('./Orbitable')

module.exports = mixer.mixin([Propertiable, Renderable, Orbitable], (base) => {
  return class Spherable extends base { }
})
  .define()
  .properties({
    texture: {
      type: Image,
    },
    axialTilt: {
      type: Number
    },
    size:{
      type: Number
    }
  })