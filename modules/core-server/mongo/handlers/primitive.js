const Primitive = require('core/modeling/types/Primitive')

module.exports = {
  for: Primitive,
  methods: {
    eq({ value }, other) {
      return {
        $eq: [value, other]
      }
    },
  },
  parse(scope, value) {
    return {
      scope,
      value,
    }
  }
}