const mixer = require('../mixer')
const Abstractable = require('../mixins/Abstractable')
const Any = require('./Any')
const Type = require('./types/Type')
const Bool = require('./types/Bool')
const NativeObject = Object

module.exports = class Object extends mixer.extends([Any, Abstractable]) {

}
  .define({
    name: 'object',
    abstract: true,
  })
  .methods({
    is: [[Type], Bool]
  })

