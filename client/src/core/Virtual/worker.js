const { workers } = require('../renderer')
const { dashToCamel } = require('../utils')

const virtuals = []

workers.push({
  process(node, variables) {
    if (!node.attributes) { return }
    [...node.attributes]
      .filter((attr) => attr.name.startsWith(':v:'))
      .forEach((attr) => {
        const virtualName = dashToCamel(attr.name.replace(':v:', ''))
        const virtualClass = virtuals.find((v) => v.definition.name === virtualName)
        if (!virtualClass) { return }
        const virtual = new virtualClass(node, attr.value)
        if (!node.v) {
          node.v = {}
        }

        node.v[virtualName] = virtual
        node.removeAttribute(attr.name)
      })
  }
})

module.exports = {
  virtuals,
}