const Model = require('../../../types/Model')

module.exports = {
  for: Model,
  methods: {
    eq({ value }, other) {
      return value.equals(other)
    },
  },
  parse(scope, value, context) {
    let model
    if (typeof value === 'string') {
      model = {
        _id: value,
      }
    } else {
      model = value
    }

    const type = context.definition.type.getType(context.source.type)
    if (!(model instanceof type)) {
      model = new type(model)
    }

    return {
      scope,
      value: model,
    }
  },
  getType: (type) => type,
}
