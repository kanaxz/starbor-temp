const mixer = require('../../mixer')
const Type = require('./Type')
const Bool = require('./Bool')
const Real = require('./Real')

module.exports = class Object extends mixer.extends(Real) {

}
  .define({
    name: 'object',
    abstract: true,
  })
  .methods({
    is: [[Type], Bool]
  })

