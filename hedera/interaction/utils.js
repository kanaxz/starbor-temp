const selector = '[selectable]'
const className = 'selected'

const getSelectables = (root) => {
  return [...root.querySelectorAll(selector)]
}

const select = (root, el) => {
  const current = getSelected(root)
  if (current) {
    current.classList.remove(className)
  }
  el.classList.add(className)
}

const selectFirst = (root) => {
  const first = root.querySelector(selector)
  if (!first) { return }
  select(root, first)
}

const getSelected = (root) => {
  const current = root.querySelector(`.${className}`)
  return current
}

const interact = (root) => {
  const current = getSelected(root)
  if (!current) { return }

  current.v.selectable.callback()
}

module.exports = {
  select,
  selectFirst,
  getSelectables,
  getSelected,
  interact,
}