


const isCustomElement = (node) => {
  return node.tagName && typeof customElements.get(node.tagName.toLowerCase()) != "undefined";
}

const createFunction = (stringFunction, variables = {}) => {
  const functionArgs = []
  const variablesArgs = []

  for (var [name, value] of Object.entries(variables)) {
    functionArgs.push(name)
    variablesArgs.push(value)
  }
  functionArgs.push(stringFunction)
  return function () {

    const fn = Function.apply(null, functionArgs)
    return fn.apply(this, variablesArgs)
  }
}


const dashToCamel = (string) => string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())


module.exports = {
  dashToCamel,
  createFunction,
  isCustomElement,
  template: require('./template')
}