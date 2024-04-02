const GameEntity = require('./GameEntity')
const Position3D = require('../../objects/Position3D')

module.exports = class System extends GameEntity {
  destroy() {
    console.warn('destroying', this)
    super.destroy()
  }
}
  .define({
    name: 'system',
    pluralName: 'systems'
  })
  .properties({
    position: {
      type: Position3D,
      dimensionState: {
        step: 0.0000001,
      }
    }
  })
  .controllers({
    create: {
      logic(context, states) {
        states.parent.disabled = true
      }
    },
    update: {
      logic(context, states) {
        states.parent.disabled = true
      }
    }
  })
