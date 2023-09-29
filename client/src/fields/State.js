const ViewModel = require('hedera/ViewModel')

module.exports = class State extends ViewModel {

}
  .define()
  .properties({
    value: 'any',
    disabled: 'any',
    hidden: 'any',
  })
