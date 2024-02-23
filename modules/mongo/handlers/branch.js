const Branch = require.main.require('modeling/types/Branch')
const { unwind } = require('./utils')

module.exports = {
  for: Branch,
  methods: {},
  getType: (type) => type.template,
  load(property, pipeline) {
    const type = property.type.definition.template
    const { pluralName } = type.definitions.find((d) => d.pluralName)
    const on = `${property.on}._id`
    const propertyName = property.name
    const [before, after] = unwind(propertyName)

    return [
      {
        $graphLookup: {
          from: pluralName,
          as: property.name,
          startWith: `$${on}`,
          connectFromField: on,
          connectToField: '_id',
        }
      },
      ...before,
      ...pipeline,
      ...after,
    ]
  },
  unload(property, path) {
    return [{
      $unset: {
        [path]: ""
      }
    }]
  }
}
