const Object = require('../../../types/Object')

module.exports = {
  for: Object,
  methods: {
    is(source, type) {
      return source.value instanceof type
    },
  }
}