const { makeId } = require('core/utils/string')

const unwind = (propertyName) => {
  const tempId = `var${makeId()}`

  return [
    [
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
    ],
    [
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
  ]
}


module.exports = {
  unwind,
}