const Array = require('core/modeling/types/Array')
const mixer = require('core/mixer')

module.exports = {
  for: Array,
  parse(scope, objects, context) {
    const template = context.definition.type.getLastTemplate()
    const values = objects.map((object) => {
      const result = scope.processObject(object)
      if (!mixer.is(result.type.prototype, template)) {
        throw new Error()
      }
      return result.value
    })
    return {
      value: values,
    }
  },
  methods: {
    find(source, fn) {
      return {
        $filter: {
          input: source.value,
          as: fn.args[0].name,
          cond: {
            $and: fn.body,
          },
        }
      }
    },
    any(source, fn) {
      const find = this.find(source, fn)
      return {
        $gt: [
          {
            $size: find,
          },
          0
        ]
      }
    }
  }
}