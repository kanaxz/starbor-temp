const mixer = require('../../mixer')

module.exports = mixer.mixin((base) => {
  return class Searchable extends base { }
})
  .define()