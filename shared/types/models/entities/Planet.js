const GameEntity = require('./GameEntity')

module.exports = class Planet extends GameEntity {

}
  .define({
    name: 'planet',
    pluralName: 'planets'
  })
  .properties({
    //parent: System,
  })
