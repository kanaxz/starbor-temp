const Object = require('core/modeling/Object')

module.exports = {
  for: Object,
  methods: {
    is(source, type) {
      const tree = type.getAllChilds()
        .map((c) => c.definition.name)
      return {
        $in: [
          {
            $getField: {
              input: source.value,
              field: '@type',
            }
          },
          tree
        ]
      }
    },
  }
}