const ViewModel = require('hedera/ViewModel')

module.exports = class Camera extends ViewModel {

}
  .define()
  .properties({
    x: 'any',
    y: 'any',
    zoom: 'any',
  })

