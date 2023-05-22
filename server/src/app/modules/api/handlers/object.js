const Object = require.main.require('core/modeling/Object')

module.exports = {
  for: Object,
  methods: {
    is(source, type) {
      const child = source.type.findChild((c) => c.definition.name === type)
      //console.log(child)
      const tree = child.getAllChilds()
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