const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Markdown = require('modeling/types/Markdown')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Wikiable extends base {

  }
})
  .define()
  .properties({
    wiki: {
      type: Markdown,
      state: {
        required: true,
      }
    }
  })