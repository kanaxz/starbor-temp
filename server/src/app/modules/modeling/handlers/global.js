const Global = require('core/modeling/types/Global')

module.exports = {
  for: Global,
  methods: {
    and(scope, args) {
      return {
        $and: args,
      }
    },
    or(scope, args) {
      return {
        $or: args,
      }
    }
  }
}