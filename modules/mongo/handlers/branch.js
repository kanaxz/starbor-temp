const Branch = require.main.require('modeling/types/Branch')
const { makeId } = require('core/utils/string')

module.exports = {
  for: Branch,
  methods: {},
  getType: (type) => type.template,
  load(property, pipeline) {
    const type = property.type.definition.template
    const collectionName = type.definition.pluralName
    const on = `${property.on}._id`
    const tempId = makeId()
    const propertyName = property.name
    return [
      {
        $graphLookup: {
          from: collectionName,
          as: property.name,
          startWith: `$${on}`,
          connectFromField: on,
          connectToField: '_id',
        }
      },
      {
        $unwind: {
          path: `$${propertyName}`,
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          [`${propertyName}.${tempId}`]: '$$ROOT',
        }
      },
      {
        $replaceRoot: {
          newRoot: `$${propertyName}`
        }
      },
      ...pipeline,
      {
        $group: {
          _id: `$${tempId}._id`,
          [tempId]: { $first: `$${tempId}` },
          [propertyName]: {
            $push: {
              $cond: {
                if: { $not: { $not: ["$_id"] } },
                then: '$$CURRENT',
                else: '$$REMOVE',
              }
            },
          }
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              `$${tempId}`,
              {
                [propertyName]: `$${propertyName}`
              }
            ]
          }
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
