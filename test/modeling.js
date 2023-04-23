require('core')
const mixer = require('core/mixer')
const Any = require('core/modeling/Any')
const { Primitive, Bool } = require('core/modeling/objects')

console.log(mixer.is(Bool.prototype, Any))
