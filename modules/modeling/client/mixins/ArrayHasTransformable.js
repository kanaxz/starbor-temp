const mixer = require('../../../shared/mixer')
const symbol = Symbol('ArrayHasTransformable')
const Transformable = require('./Transformable')

module.exports = mixer.mixin((base) => {
  return class ArrayHasTransformable extends base {
    tryRemoveTransformable(value) {
      if (!value || !mixer.is(value, Transformable)) { return }

      const index = this[symbol].findIndex(({ transformable }) => transformable === value)
      if (index === -1) { return }

      const { listener } = this[symbol][index]
      listener.remove()
      this[symbol].splice(index, 1)
    }

    tryListenTransformable(index, value) {
      if (!value || !mixer.is(value, Transformable)) { return }

      const listener = value.on('transformed', (transformedTo) => {
        this[index] = transformedTo
      })

      if (!this[symbol]) {
        this[symbol] = []
      }

      this[symbol].push({
        listener,
        transformable: value,
      })
    }

    indexDeleted(index, value) {
      this.tryRemoveTransformable(value)
      return super.indexDeleted(index, value)
    }

    indexSet(index, value, oldValue) {
      this.tryRemoveTransformable(oldValue)
      this.tryListenTransformable(index, value)

      return super.indexSet(index, value, oldValue)
    }
  }
})
