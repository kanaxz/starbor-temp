const HasMany = require('modeling/types/HasMany')
const { makeId } = require('core/utils/string')

module.exports = {
  for: HasMany,
  methods: {},
  getType: (type) => type.template,
  load(property, pipeline) {
    const type = property.type.definition.template
    const collectionName = type.definition.pluralName
    const targetProperty = type.properties.find((p) => p.name === property.on)

    const id = `var${makeId()}`
    const propertyName = property.name

    let filter
    if (targetProperty.type.prototype instanceof Array) {
      const t = `var${makeId()}`
      filter = {
        $first: {
          $filter: {
            input: `$${property.on}`,
            as: t,
            cond: {
              $eq: [`$$${t}._id`, `$$${id}`]
            },
          }
        }
      }
    } else {
      filter = {
        $eq: [`$${property.on}._id`, `$$${id}`]
      }
    }

    return [
      {
        $lookup: {
          from: collectionName,
          as: propertyName,
          let: { [id]: `$_id` },
          pipeline: [
            {
              $match: {
                $expr: filter,
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
