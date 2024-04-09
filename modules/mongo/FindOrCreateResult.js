const { Object, Bool, Model } = require('modeling')


module.exports = class FindOrCreateResult extends Object {

}
  .define()
  .properties({
    created: Bool,
    model: Model,
  })