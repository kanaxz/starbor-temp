const { Array, Bool } = require('./objects')
const Any = require('./Any')

module.exports = {
  and: [[{ type: Array.of(Any), spread: true }], Bool],
  not: [[Any], Bool]
}