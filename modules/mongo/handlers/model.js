const { Model } = require.main.require('modeling/types')
const { makeId } = require('core/utils/string')

module.exports = {
  for: Model,
  methods: {
    eq(source, other) {
      return {
        $eq: [{
          $getField: {
            input: source.value,
            field: '_id',
          }
        }, {
          $getField: {
            input: other,
            field: '_id',
          }
        }]
      }
    },
  },
  parse(scope, value) {
    let model
    if (typeof value === 'string') {
      model = {
        _id: value,
      }
    } else {
      model = value
    }
    return {
      scope,
      value: model,
    }
  },
  getType: (type) => type,
  load(property, pipeline) {
    const { pluralName } = property.type.definitions.find((d) => d.pluralName)
    const name = property.name
    const id = `var${makeId()}`
    return [{
      $lookup: {
        from: pluralName,
        as: name,
        let: { [id]: `$${name}` },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [`$_id`, `$$${id}._id`]
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
