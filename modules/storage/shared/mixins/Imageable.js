const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Image = require('../Image')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Imageable extends base {

  }
})
  .define()
  .properties({
    image: {
      type: Image,
    },
  })

