const Object = require.main.require('../../shared/core/modeling/Object')

module.exports = [Object, {
  is(source, type) {
    const child = source.class.findChild((c) => c.definition.name === type)
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
}]