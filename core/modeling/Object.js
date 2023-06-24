const mixer = require('../mixer')
const Type = require('./types/Type')
const Bool = require('./types/Bool')
const Holder = require('../mixins/Holder')
const Real = require('./Real')

module.exports = class Object extends mixer.extends(Real, [Holder]) {

}
  .define({
    name: 'object',
    abstract: true,
  })
  .methods({
    is: [[Type], Bool]
  })

