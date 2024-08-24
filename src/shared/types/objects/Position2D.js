const { Object, Number } = require('sools-modeling/types')
const Position = require('./Position')

const getDimensionState = ({ property }, ownProperty) => {
  return {
    ...(property?.dimensionState || {})
  }
}

class Position2D extends Position {

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

