const Primitive = require('modeling/types/Primitive')

module.exports = {
  for: Primitive,
  methods: {
    eq({ value }, other) {
      return {
        $eq: [value, other]
      }
    },
    neq({ value }, other) {
      return {
        $ne: [value, other]
      }
    },
    in({ value }, array) {
      return {
        $in: [value, array]
      }
    }
  },
}