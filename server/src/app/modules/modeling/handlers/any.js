const Any = require('core/modeling/Any')

module.exports = {
  for: Any,
  methods: {
    not({ value }) {
      return {
        $not: [value]
      }
    }
  }
}