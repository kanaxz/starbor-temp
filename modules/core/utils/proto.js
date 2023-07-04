
const forEach = (type, fn) => {
  while (type.prototype.__proto__) {
    const stop = fn(type)
    if (stop) {
      return
    }
    type = type.prototype.__proto__.constructor
  }
}

const get = (type) => {
  const result = []
  forEach(type, (t) => {
    result.push(t)
  })
  return result
}

const filter = (type, fn) => {
  const result = []
  forEach(type, (parent) => {
    const match = fn(parent)
    if (match) {
      result.push(parent)
    }
  })
  return result
}

module.exports = {
  get,
  forEach,
  filter,
}