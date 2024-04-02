const mixer = require('core/mixer')
const Folder = require('../Folder')
const Propertiable = require('core/mixins/Propertiable')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Folderable extends base {

  }
})
  .define()
  .properties({
    folder: {
      type: Folder,
    },
  })