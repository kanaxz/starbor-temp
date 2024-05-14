const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Image = require('../Image')
const Folderable = require('./Folderable')

module.exports = mixer.mixin([Propertiable, Folderable], (base) => {
  return class BackgroundImageable extends base {

  }
})
  .define()
  .properties({
    backgroundImage: {
      type: Image,
    },
  })

