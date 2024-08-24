const mixer = require('sools-core/mixer')
const GameEntity = require('./GameEntity')
const { Sphereable } = require('../../../mixins')

module.exports = class Star extends mixer.extends(GameEntity,[Sphereable]) {

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