const Holder = require('core-client/modeling/mixins/Holder')
const mixer = require('core/mixer')
const ViewModel = require('hedera/ViewModel')

module.exports = class Object extends mixer.extends(ViewModel, [Holder]) {

}
  .define()
  .properties({
    x: 'any',
    y: 'any',
    object: 'any',
  })

