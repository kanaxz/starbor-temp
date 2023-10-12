const mixer = require('../../../shared/mixer')
const Propertiable = require('../../../shared/mixins/Propertiable')
const symbol = Symbol('HasTransformable')
const Transformable = require('./Transformable')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class HasTransformable extends base {

    tryRemoveTransformable(value) {
      if (!value || !mixer.is(value, Transformable)) { return }

      const index = this[symbol].findIndex(({ transformable }) => transformable === value)
      if (index === -1) { return }

      const { listener } = this[symbol][index]
      this[symbol].splice(index, 1)
      listener.remove()
    }

    tryListenTransformable(property, value) {
      if (!value || !mixer.is(value, Transformable)) { return }

      const listener = value.on('transformed', (transformedTo) => {
        this[property.name] = transformedTo
      })
      if (!this[symbol]) {
        this[symbol] = []
      }

      this[symbol].push({
        listener,
        transformable: value,
      })
    }

    propertyChanged(property, value, oldValue) {
      this.tryRemoveTransformable(oldValue)
      this.tryListenTransformable(property, value)
      return super.propertyChanged(property, value, oldValue)
    }
  }
})
