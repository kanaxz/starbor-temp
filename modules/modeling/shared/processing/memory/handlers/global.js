const Global = require('../../../types/Global')

module.exports = {
  for: Global,
  methods: {
    and(scope, args = []) {
      for (const arg of args) {
        if (!arg) { return false }
      }
      return true
    },
    or(scope, args = []) {
      for (const arg of args) {
        if (arg) { return true }
      }
      return false
    },
    if(scope, $if, $then, $else) {
      if ($if) {
        return $then
      } else {
        return $else
      }
    }
  }
}