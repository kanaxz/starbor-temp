const { Object, Number } = require('modeling/types')

const getDimensionState = ({ property }, ownProperty) => {
  return {
    ...(property?.dimensionState || {})
  }
}

class Position2D extends Object {

}

Position2D.getDimensionState = getDimensionState

module.exports = Position2D
  .define({
    name: 'position2D',
  })
  .properties({
    x: {
      type: Number,
      state: getDimensionState
    },
    y: {
      type: Number,
      state: getDimensionState
    },
  })

