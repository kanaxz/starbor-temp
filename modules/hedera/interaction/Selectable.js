const Virtual = require('../Virtual')
const symbol = Symbol('selectable')
const { select, getSelectables, getSelected, selectFirst, interact } = require('./utils')

const keys = [
  [(e) => e.key === 'ArrowUp', -1],
  [(e) => e.key === 'ArrowDown', 1],
  [(e) => e.key === 'ArrowRight', 1],
  [(e) => e.key === 'ArrowLeft', -1],
  [(e) => e.key === 'Tab' && !e.shiftKey, 1],
  [(e) => e.key === 'Tab' && e.shiftKey, -1],
]

const modes = {
  horizontal: ['ArrowRight', 'ArrowLeft', 'Tab'],
  vertical: ['ArrowUp', 'ArrowDown', 'Tab']
}

const initContainer = (virtual, el) => {

  const triggers = el.querySelectorAll('[selectable-trigger]')
  el.setAttribute('tabindex', '0')
  triggers.forEach((trigger) => {
    virtual.listen(trigger, 'click', () => interact(el))
  })

  virtual.listen(el, 'click', (e) => {
    const selectable = e.target.closest('[selectable]')
    if (!selectable) { return }
    select(el, selectable)
  })

  virtual.listen(el, 'dblclick', (e) => {
    const selectable = e.target.closest('[selectable]')
    if (!selectable) { return }
    interact(el)
  })

  virtual.listen(el, 'keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      interact(el)
      return
    }
    const mode = virtual.mode || 'vertical'
    if (modes[mode].indexOf(e.key) === -1) { return }

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
  }, true)

  const focus = () => {
    const current = getSelected(el)
    if (!current) {
      selectFirst(el)
    }
  }

  el[symbol] = {
    focus
  }
}

module.exports = class Selectable extends Virtual {
  constructor(el, value) {
    super(el)
    const [callback, within] = value.split(/ within /)
    this.el.setAttribute(':v.selectable.callback', `()=>${callback}`)
    if (within) {
      this.el.setAttribute(':v.selectable.within', `${within}`)
    }
  }

  onInit() {
    this.el.setAttribute('selectable', '')
    if (!this.within[symbol]) {
      initContainer(this, this.within)
    } else {
      this.within[symbol].focus()
    }
  }
}
  .define({
    name: 'selectable'
  })
  .properties({
    callback: 'any',
    mode: 'any',
    within: 'any',
  })
