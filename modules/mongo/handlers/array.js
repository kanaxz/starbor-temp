const Array = require('modeling/types/Array')
const mixer = require('core/mixer')

module.exports = {
  for: Array,
  async parse(scope, objects, context) {
    const template = context.definition.type
      .getLastTemplate()
      .getType(context.source.type)
    const values = await Promise.all(
      objects.map(async (object) => {
        const result = await scope.processObject(object, {
          definition: {
            type: template
          },
          source: context.source,
        })
        if (!mixer.is(result.type.prototype, template)) {
          throw new Error()
        }
        return result.value
      })
    )
    return {
      value: values,
    }
  },
  methods: {
    find(source, fn) {
      return {
        $first: {
          $filter: {
            input: source.value,
            as: fn.args[0].name,
            cond: {
              $and: fn.body,
            },
          }
        }
      }
    },
    some(source, fn) {
      const find = this.find(source, fn)
      return find
    }
  }
}