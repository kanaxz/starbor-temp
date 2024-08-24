const mixer = require('sools-core/mixer')

module.exports = mixer.mixin((base) => {
  return class Renderable extends base { }
})