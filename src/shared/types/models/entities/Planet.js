const mixer = require('sools-core/mixer')
const GameEntity = require('./GameEntity')
const Sphereable = require('../../../mixins/Sphereable')

const parentLogic = (states) => {
  states.parent.filters.push({
    $is: ['$this', 'system']
  })
}

module.exports = class Planet extends mixer.extends(GameEntity, [Sphereable]) {

}
  .define({
    name: 'planet',
    pluralName: 'planets'
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
