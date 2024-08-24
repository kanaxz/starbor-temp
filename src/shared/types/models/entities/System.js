const GameEntity = require('./GameEntity')
const Position3D = require('../../objects/Position3D')
const mixer = require('sools-core/mixer')
const BackgroundImageable = require('storage/mixins/BackgroundImageable')

module.exports = class System extends mixer.extends(GameEntity, [BackgroundImageable]) {
  destroy() {
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
