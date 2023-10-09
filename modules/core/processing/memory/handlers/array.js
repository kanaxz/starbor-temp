const Array = require('../../../modeling/types/Array')
const mixer = require('../../../mixer')

module.exports = {
  for: Array,
  async parse(scope, objects, context) {
    const template = context.definition.type.getLastTemplate()
    const values = await Promise.all(
      objects.map(async (object) => {
        const result = await scope.processObject(object)
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
    async find(source, fn) {
      for (const object of objects) {
        if (await fn(object)) {
          return object
        }
      }
      return null
    },
    async some(source, fn) {
      const object = await this.find(source, fn)
      return !!object
    }
  }
}