const mixer = require('core/mixer')

module.exports = mixer.mixin((base) => {
  return class Mapeable extends base { }
})