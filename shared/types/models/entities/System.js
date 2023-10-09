const GameEntity = require('./GameEntity')

module.exports = class System extends GameEntity {

}
  .define({
    name: 'system',
    pluralName: 'systems'
  })
  .controllers({
    create: {
      logic(context, states) {
        console.log('logic here')
        states.parent.disabled = true
      }
    },
    update: {
      logic(context, states) {
        console.log('logic here')
        states.parent.disabled = true
      }
    }
  })
