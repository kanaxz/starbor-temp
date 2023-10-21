const mixer = require('../mixer')
const Eventable = require('../mixins/Eventable')

module.exports = class IntermediateArray extends mixer.extends(Array, [Eventable]) {
  constructor(...args) {
    super(...args)

    return new Proxy(this, {
      deleteProperty: (target, property) => {
        if (property in target) {
          var value = target[property];
          delete target[property];
          const index = parseInt(property)
          if (!isNaN(index)) {
            target.indexDeleted(index, value)
          }
        }
        return true
      },
      set: (target, property, value) => {
        let index
        try {
          index = parseInt(property)
        } catch (e) { }
        if (index !== undefined && !isNaN(index)) {
          target.setIndex(index, value)
        } else {
          target[property] = value;
        }
        return true
      }
    })
  }

  indexDeleted(index, value) {
    this.emit('indexDeleted', [index, value])
    this.emit('propertyChanged:length', [this.length])
  }

  setIndex(index, value) {
    const oldValue = this[index]
    this[index] = value
    this.indexSet(index, value, oldValue)
  }

  indexSet(index, value, oldValue) {
    this.emit('indexSet', [index, value, oldValue])
    this.emit('propertyChanged:length', [this.length])
  }

  remove(object) {
    var result = this.tryRemove(object)
    if (!result)
      throw new RangeError()
  }

  tryRemove(object) {
    var index = this.indexOf(object);
    if (index != -1) {
      this.splice(index, 1)
      return true
    } else
      return false
  }
}