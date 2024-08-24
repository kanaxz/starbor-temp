const mixer = require('sools-core/mixer')
const GameEntity = require('./GameEntity')
const Sphereable = require('../../../mixins/Sphereable')

const parentLogic = (states) => {
  states.parent.filters.push({
    $is: ['$this', 'planet']
  })
}

module.exports = class Moon extends mixer.extends(GameEntity, [Sphereable]) {

}
  .define({
    name: 'moon',
    pluralName: 'moons'
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
