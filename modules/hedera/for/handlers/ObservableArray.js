const mixer = require('core/mixer')
const Bindeable = require('core/mixins/Bindeable')

const Array = require('core/types/Array')
const Eventable = require('core/mixins/Eventable')
const Destroyable = require('core/mixins/Destroyable')

let id = 0
module.exports = class ObservableArrayHandler extends mixer.extends([Bindeable, Eventable]) {
  static handle(source) {
    return source instanceof Array
  }

  constructor(repeater) {
    super()
    this.id = id++
    this.repeater = repeater
    this.source = this.repeater.source
    this.on(this.source, 'indexDeleted', this.b(this.onIndexDeleted))
    this.on(this.source, 'indexSet', this.b(this.onIndexSet))
    this.timeout = null
    this.modifs = []
  }

  updateTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => this.processModifications(), 1)
  }

  onIndexDeleted(index) {
    console.log('index deleted', this.repeater, index)
    this.modifs.push({
      type: 'delete',
      index,
    })
    this.updateTimeout()
  }

  onIndexSet(index, newValue, oldValue) {
    console.log('index set', this.repeater, newValue)
    this.modifs.push({
      type: 'set',
      oldValue,
      newValue,
      index,
    })
    this.updateTimeout()
  }

  insertIt(itToInsert) {
    const { index, element } = itToInsert
    const parent = this.repeater.el
    if (element === parent.children[index]) { return }
    if (index >= parent.children.length) {
      parent.appendChild(element)
    } else {
      parent.insertBefore(element, parent.children[index])
    }
  }

  moveIt(itToMove) {
    this.insertIt(itToMove)
  }

  removeIt(it) {
    it.destroy()
    const itIndex = this.repeater.iterations.indexOf(it)
    if (itIndex === -1) { return }
    this.repeater.iterations.splice(itIndex, 1)
  }

  removeItIfValueNotUsed(itToCheck) {
    const exists = this.source.find((object) => object === itToCheck.object)
    if (!exists) {
      this.removeIt(itToCheck)
    }
  }

  async processModifications() {
    // with the setTimeout, we might already be destroyed  
    if (this[Destroyable.symbol]) { return }
    this.timeout = null
    const modifs = [...this.modifs]
    this.modifs = []
    for (const modif of modifs) {
      if (modif.type === 'delete') {
        const oldIt = this.repeater.iterations.find((it) => it.index === modif.index)
        if (oldIt) {
          this.removeItIfValueNotUsed(oldIt)
        }

      } else if (modif.type === 'set') {
        const newIt = this.repeater.iterations.find((it) => it.object === modif.newValue)
        if (modif.oldValue) {
          const oldIt = this.repeater.iterations.find((it) => it.object === modif.oldValue)
          this.removeItIfValueNotUsed(oldIt)
        }
        if (newIt) {
          newIt.index = modif.index
          this.moveIt(newIt)
        } else {
          const itToInsert = this.repeater.iteration(modif.newValue, modif.index)
          this.insertIt(itToInsert)
          itToInsert.element = await itToInsert.scope.render(itToInsert.element)
        }
      }
    }
  }

}

