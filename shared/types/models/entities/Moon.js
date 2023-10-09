const GameEntity = require('./GameEntity')

const parentLogic = (states) => {
  states.parent.filters.push({
    $is: ['$this', 'planet']
  })
}

module.exports = class Moon extends GameEntity {

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
