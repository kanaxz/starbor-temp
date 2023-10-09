const GameEntity = require('./GameEntity')

const parentLogic = (states) => {
  states.parent.filters.push({
    $is: ['$this', 'system']
  })
}

module.exports = class Planet extends GameEntity {

}
  .define({
    name: 'planet',
    pluralName: 'planets'
  })
  .properties({
    //parent: System,
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
