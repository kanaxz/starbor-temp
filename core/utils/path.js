const set = (object, path, value) => {
  const split = path.split('.')
  const name = split.pop()
  for (const segment of split) {
    object = object[segment]
  }
  object[name] = value
}

const get = (object, path) => {
  const split = path.split('.')
  for (const segment of split) {
    object = object[segment]
  }

  return object
}


module.exports = {
  set,
  get,
}