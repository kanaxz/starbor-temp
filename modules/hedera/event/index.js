const { workers } = require('../renderer')
const { createFunction, dashToCamel } = require('../utils')

const prefix = ':on:'

const suffixes = {
  prevent: {
    onEvent(event) {
      event.preventDefault()
    }
  },
  'no-capture': {
    onListen(options) {
      options.capture = false
    }
  }
}

workers.push({
  process(node, variables) {
    if (!node.attributes) { return }
    [...node.attributes]
      .filter((attr) => attr.name.startsWith(prefix))
      .forEach((attr) => {
        const options = {}
        let [eventName, ...suffixeNames] = attr.name.replace(prefix, '').split('.')
        suffixeNames.forEach((s) => {
          const suffix = suffixes[s]
          suffix.onListen && suffix.onListen(options)
        })
        eventName = dashToCamel(eventName)
        node.addEventListener(eventName, (event) => {
          suffixeNames.forEach((s) => {
            const suffix = suffixes[s]
            suffix.onEvent && suffix.onEvent(event)
          })
          suffixeNames.forEach((s) => {
            const suffix = suffixes[s]
            suffix.onEvent && suffix.onEvent(event)
          })
          const vars = { ...variables, event }
          delete vars.this
          const fn = createFunction(attr.nodeValue, vars)
          fn.call(variables.this)
        })
        node.removeAttribute(attr.name)
      })
  }
})
