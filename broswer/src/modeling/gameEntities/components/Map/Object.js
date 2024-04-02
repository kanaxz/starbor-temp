const Holder = require('modeling-client/mixins/holding/Holder')
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

