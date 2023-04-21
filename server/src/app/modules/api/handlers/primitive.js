const { Primitive } = require.main.require('../../shared/core/modeling/objects')

module.exports = [Primitive, {
  eq({ value }, other) {
    return {
      $eq: [value, other]
    }
  },
}]