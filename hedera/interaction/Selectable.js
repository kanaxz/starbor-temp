const Virtual = require('../Virtual')
const renderer = require('../renderer')
const symbol = Symbol('selectable')
const { select, getSelectables, getSelected, selectFirst, interact } = require('./utils')

const keys = [
  [(e) => e.key === 'ArrowUp', -1],
  [(e) => e.key === 'ArrowDown', 1],
  [(e) => e.key === 'Tab' && !e.shiftKey, 1],
  [(e) => e.key === 'Tab' && e.shiftKey, -1],
]

const initContainer = (el) => {

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      interact(el)
      return
    }

    const key = keys.find(([check]) => check(e))
    if (!key) { return }

    e.preventDefault()
    const current = getSelected(el)
    if (!current) {
      selectFirst(el)
    } else {
      const selectables = getSelectables(el)
      const currentIndex = selectables.indexOf(current)
      let nextIndex = currentIndex + key[1]
      if (nextIndex >= selectables.length) {
        nextIndex = 0
      } else if (nextIndex < 0) {
        nextIndex = selectables.length - 1
      }
      const next = selectables[nextIndex]
      if (next) {
        select(el, next)
      }
    }
  })

  el[symbol] = {}
}

module.exports = class Selectable extends Virtual {
  constructor(el, value) {
    super(el)
    const [callback, within] = value.split('within')
    this.el.setAttribute(':v.selectable.callback', `()=>${callback}`)
    if (within) {
      this.el.setAttribute(':v.selectable.within', `${within}`)
    }
  }

  initialize() {
    this.el.setAttribute('selectable', '')
    if (!this.within[symbol]) {
      initContainer(this.within)
    }
    return super.initialize()
  }
}
  .define({
    name: 'selectable'
  })
  .properties({
    callback: 'any',
    within: 'any',
  })
