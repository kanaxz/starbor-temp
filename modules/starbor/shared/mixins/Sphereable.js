const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Renderable = require('./Renderable')
const { Image } = require('storage')
const { Number } = require('modeling/types')
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