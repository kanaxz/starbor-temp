
const registries = {

}

const register = (type, name, component, load) => {
  if (!registries[name]) {
    registries[name] = []
  }
  registries[name].push({
    type,
    component,
    load
  })
}

const get = (type, name) => {
  const registry = registries[name]
  while (type) {
    const find = registry.find((r) => r.type === type)
    if (find) {
      return find.component
    }
    type = type.parent
  }
  return null
}

module.exports = {
  register,
  get,
}