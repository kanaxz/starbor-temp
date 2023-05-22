const Model = require.main.require('core/modeling/Model')
const { makeId } = require('core/utils/string')

module.exports = {
  for: Model,
  methods: {
    eq(source, other) {

    },
  },
  getType: (type) => type,
  load(property, pipeline) {
    const collectionName = property.type.definition.pluralName
    const name = property.name
    const id = makeId()
    return [{
      $lookup: {
        from: collectionName,
        as: name,
        let: { [id]: `$${name}` },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [`_id`, `$$${id}`]
              },
            }
          },
          ...pipeline,
        ]
      }
    }, {
      $addFields: {
        [name]: {
          $first: `$${name}`
        }
      }
    }]
  },
  unload(property) {
    const name = property.name
    return [{
      $addFields: {
        [name]: [`$${name}`, '_id'].join('.')
      }
    }]
  }
}
