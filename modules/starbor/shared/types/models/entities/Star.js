const GameEntity = require('./GameEntity')

module.exports = class Star extends GameEntity {

}
  .define({
    name: 'star',
    pluralName: 'stars'
  })
  .controllers({
    update: {
      logic(context, states) {
        states.parent.filters.push({
          $is: ['$this', 'system']
        })
      }
    }
  })