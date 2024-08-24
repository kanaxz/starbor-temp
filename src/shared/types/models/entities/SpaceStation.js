const mixer = require('sools-core/mixer')
const GameEntity = require('./GameEntity')
const GLTFable = require('../../../mixins/GLTFable')

const parentLogic = (states) => {

}

module.exports = class SpaceStation extends mixer.extends(GameEntity, [GLTFable]) {

}
  .define({
    name: 'spaceStation',
    pluralName: 'spaceStations'
  })

  .controllers({
    create: {
      logic(context, states) {
        parentLogic(states)
      }
    },
    update: {
      logic(context, states) {
        parentLogic(states)
      }
    }
  })
