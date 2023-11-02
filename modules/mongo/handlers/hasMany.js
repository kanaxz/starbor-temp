const HasMany = require('modeling/types/HasMany')
const { makeId } = require('core/utils/string')

module.exports = {
  for: HasMany,
  methods: {},
  getType: (type) => type.template,
  load(property, pipeline) {
    const type = property.type.definition.template
    const collectionName = type.definition.pluralName
    const on = `${property.on}._id`

    const id = `var${makeId()}`
    const propertyName = property.name
    return [
      {
        $lookup: {
          from: collectionName,
          as: propertyName,
          let: { [id]: `$_id` },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [`$${on}`, `$$${id}`]
                },
              }
            },
            ...pipeline,
          ]
        }
      }
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
