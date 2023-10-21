const mixer = require('core/mixer')
const Image = require('../Image')
const Folderable = require('./Folderable')
const Propertiable = require('core/mixins/Propertiable')
module.exports = mixer.mixin([Propertiable], (base) => {
  return class Imageable extends base {

  }
})
  .define()
  .properties({
    image: {
      type: Image,
      state: {
        required: true,
      }
    },

  })

