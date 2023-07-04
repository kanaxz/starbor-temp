const { Real } = require('core/modeling/types')

module.exports = {
  for: Real,
  methods: {
    not({ value }) {
      return {
        $not: [value]
      }
    }
  }
}