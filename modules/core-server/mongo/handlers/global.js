const { Global } = require('core/modeling/types')

module.exports = {
  for: Global,
  methods: {
    and(scope, args = []) {
      return {
        $and: args,
      }
    },
    or(scope, args = []) {
      return {
        $or: args,
      }
    },
    if(scope, $if, $then, $else) {
      return {
        $cond: [$if, $then, $else],
      }
    }
  }
}