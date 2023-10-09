const Object = require('../../../modeling/types/Object')

module.exports = {
  for: Object,
  methods: {
    is(source, type) {
      return source.value instanceof type
    },
  }
}