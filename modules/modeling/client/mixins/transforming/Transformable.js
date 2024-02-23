const mixer = require('core/mixer')
const Eventable = require('core/mixins/Eventable')
const Destroyable = require('core/mixins/Destroyable')

module.exports = mixer.mixin([Destroyable, Eventable], (base) => {
  return class Transformable extends base {
    transform(to) {
      this.emit('transformed', [to])
      this.destroy()
    }
  }
})

