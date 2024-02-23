const { makeId } = require('core/utils/string')
const OwnMany = require('modeling/types/OwnMany')
const { unwind } = require('./utils')

module.exports = {
  for: OwnMany,
  methods: {},
  getType: (type) => type.template,
  load(property, pipeline) {
    const type = property.type.definition.template
    const collectionName = type.definition.pluralName

    const id = `var${makeId()}`
    const propertyName = property.name

    return [
      {
        $lookup: {
          from: collectionName,
          as: propertyName,
          let: {
            [id]: {
              $map: {
                input: `$${propertyName}`,
                as: 't',
                in: '$$t._id'
              }
            }
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [`$_id`, `$$${id}`]
                },
              }
            },
            ...pipeline,
          ]
        }
      },
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
