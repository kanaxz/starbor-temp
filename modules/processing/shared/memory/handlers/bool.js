const Bool = require('modeling/types/Bool')

module.exports = {
  for: Bool,
  check(value) {
    return typeof value === 'boolean'
  },
}