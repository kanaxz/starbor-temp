const { Bool } = require('modeling/types')

module.exports = {
  for: Bool,
  check(value) {
    return typeof value === 'boolean'
  },

  parse(scope, value) {
    if (typeof value !== 'boolean') {
      throw new Error()
    }
    return {
      scope,
      value,
      type: Bool,
    }
  }
}