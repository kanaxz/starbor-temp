const Model = require('modeling/types/Model')

module.exports = {
  for: Model,
  methods: {
    eq({ value }, other) {
      return value.equals(other)
    },
  },
  parse(scope, value) {
    let model
    if (typeof value === 'string') {
      model = {
        _id: value,
      }
    } else {
      model = value
    }

    return {
      scope,
      value: model,
    }
  },
  getType: (type) => type,
}
