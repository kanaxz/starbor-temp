const { workers } = require('../renderer')
const { createFunction, dashToCamel } = require('../utils')

const prefix = ':on:'

const suffixes = {
  prevent(event) {
    event.preventDefault()
  }
}

workers.push({
  process(node, variables) {
    if (!node.attributes) { return }
    [...node.attributes]
      .filter((attr) => attr.name.startsWith(prefix))
      .forEach((attr) => {
        let [eventName, ...suffixeNames] = attr.name.replace(prefix, '').split('.')

        eventName = dashToCamel(eventName)
        node.addEventListener(eventName, (event) => {
          suffixeNames.forEach((s) => suffixes[s](event))
          const vars = { ...variables, event }
          delete vars.this
          const fn = createFunction(attr.nodeValue, vars)
          fn.call(variables.this)
        })
        node.removeAttribute(attr.name)
      })
  }
})
