const mixer = require('../../../shared/mixer')
const Context = require('../Context')
const Eventable = require('../../../shared/mixins/Eventable')
const Destroyable = require('../../../shared/mixins/Destroyable')

module.exports = mixer.mixin([Destroyable, Eventable], (base) => {
  return class Transformable extends base {
    transform(to) {
      this.emit('transformed', to)
      this.destroy()
    }
  }
})

