const { workers } = require('../global')
const { dashToCamel } = require('../utils')

const virtuals = []

workers.push({
  process(node, variables) {
    if (!node.attributes) { return }
    [...node.attributes]
      .filter((attr) => attr.name.startsWith(':v-'))
      .forEach((attr) => {
        const [virtualName, ...args] = dashToCamel(attr.name.replace(':v-', '')).split('.')
        const virtualClass = virtuals.find((v) => v.definition.name === virtualName)
        if (!virtualClass) { return }
        const params = args.reduce((acc, arg) => {
          acc[arg] = true
          return acc
        }, {})
        const virtual = new virtualClass(node, attr.value, params)
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