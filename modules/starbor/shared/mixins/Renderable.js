const mixer = require('core/mixer')

module.exports = mixer.mixin((base) => {
  return class Renderable extends base { }
})