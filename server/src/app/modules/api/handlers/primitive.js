const { Primitive } = require.main.require('core/modeling/objects')

module.exports = [Primitive, {
  eq({ value }, other) {
    return {
      $eq: [value, other]
    }
  },
}]