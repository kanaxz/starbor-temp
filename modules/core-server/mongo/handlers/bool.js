const { Bool } = require('core/modeling/types')

module.exports = {
  for: Bool,
  check(value) {
    return typeof value === 'boolean'
  },
}