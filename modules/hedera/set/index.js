const { workers } = require('../renderer')
const utils = require('../utils')
const Event = require('core/types/Event')
const { set } = require('core/utils/path')
const { createFunction, dashToCamel } = utils

const attributes = {
  class: (() => {
    const caches = []
    return (node, value, key) => {
      const classes = value.split(' ').filter((o) => o)
      let cache = caches.find((c) => c.node === node && c.key === key)
      if (cache) {
        for (const cssClass of cache.classes) {
          node.classList.remove(cssClass)
        }
      } else {
        cache = {
          node,
          classes,
          key
        }
        caches.push(cache)
      }
      classes.forEach((c) => node.classList.add(c))
      cache.classes = classes
    }
  })(),
  innerHtml(node, value, key) {
    node.innerHTML = value
  }
}

const setAttr = (node, path, value, key) => {
  const attr = attributes[path]
  if (attr) {
    attr(node, value, key)
    return
  }
  set(node, path, value)
}

const expressionRegex = /{{.*?}}/g
const PREFIX = ':'

const processFunctionString = (string) => {
  let sanitized = string
  const paths = string.match(/([\w?@.]+)/g) || []
  //.filter((p) => p.indexOf('@') !== -1)
  paths
    .forEach((p) => {
      sanitized = sanitized.replace(p, p.replace(/@/g, ''))
    })

  return {
    sanitized,
    paths,
  }
}

const onBindingGetProperty = new Event()
const onBindingDestroyed = new Event()

class BindingFunction {
  constructor(functionString, variables, callback, trigger) {
    this.functionString = functionString
    this.variables = variables
    this.callback = callback
    this.listeners = []
    this.holdables = []
    const { sanitized, paths } = processFunctionString(functionString)
    this.paths = paths
    const vars = {
      ...variables
    }
    delete vars.this
    this.sanitizedFunctionString = sanitized
    this.function = createFunction('return ' + sanitized, vars)
    this.update(trigger)
  }

  getValue() {
    const thisArg = this.variables.this
    const value = this.function.call(thisArg)
    return value
  }

  update(trigger = true) {
    this.destroy()
    this.listeners = []
    this.paths.forEach((path) => {
      const segments = path.split('.')
      let value = this.variables
      segments.forEach((segment) => {
        if (!value) { return }
        onBindingGetProperty.trigger(this, value)

        const propertyName = segment.replace(/[@?]+/g, '')
        if (segment.startsWith('@')) {
          if (!value.on) {
            console.log(path, { value })
            throw new Error()
          }
          const listener = value.on(`propertyChanged:${propertyName}`, () => {
            this.update()
          })
          this.listeners.push(listener)
        }
        value = value[propertyName]
      })
    })

    if (trigger) {
      const value = this.getValue()
      this.callback(value)
    }
  }

  destroy() {
    this.listeners.forEach((l) => l.remove())
    onBindingDestroyed.trigger(this)
  }
}



class BindingExpression {
  constructor(expression, variables, callback) {
    this.expression = expression
    this.variables = variables
    this.callback = callback
    this.functions = []
    this.update()
  }

  update() {
    let value = this.expression
    this.destroy()
    this.functions = this.expression.match(expressionRegex)
      .map((path) => {

        const sanitizePath = path.replace('{{', '').replace('}}', '')
        const bindingFunction = new BindingFunction(sanitizePath, this.variables, () => {
          this.update()
        }, false)

        value = value.replace(path, bindingFunction.getValue())
        return bindingFunction
      })

    this.expression.match(expressionRegex)
    this.callback(value)
  }

  destroy() {
    this.functions.forEach((p) => p.destroy())
  }
}



workers.push({
  expressions: [],
  process(node, variables) {
    if (!node.attributes) { return }
    [...node.attributes]
      .filter((attr) => attr.name.startsWith('::'))
      .forEach((attr) => {
        const path = dashToCamel(attr.name.replace('::', ''))
        const bindingExpression = new BindingExpression(attr.nodeValue, variables, (value) => {
          setAttr(node, path, value, attr.nodeValue)
        })
        this.expressions.push({
          node,
          bindingExpression
        })
        node.removeAttribute(attr.name)
      })
  },
  destroy(node) {
    this.expressions
      .filter((p) => p.node === node)
      .forEach((p) => {
        p.bindingExpression.destroy()
      })
  }
}, {
  expressions: [],
  process(node, variables) {
    if (node.nodeType !== Node.TEXT_NODE) { return }
    if (node.textContent.indexOf('{{') === -1) { return }

    const bindingExpression = new BindingExpression(node.textContent, variables, (value) => {
      node.textContent = value
    })

    this.expressions.push({ node, bindingExpression })
  },
  destroy(node) {
    this.expressions
      .filter((p) => p.node === node)
      .forEach((p) => {
        p.bindingExpression.destroy()
      })
  }
}, {
  paths: [],
  process(node, variables) {
    if (!node.attributes) { return }
    [...node.attributes]
      .filter((attr) => attr.name.startsWith(PREFIX))
      .forEach((attr) => {
        const path = dashToCamel(attr.name.replace(PREFIX, ''))
        const bindingFunction = new BindingFunction(attr.nodeValue, variables, (value) => {
          setAttr(node, path, value, attr.nodeValue)
        })
        this.paths.push({
          node,
          bindingFunction
        })
        node.removeAttribute(attr.name)
      })
  },
  destroy(node) {
    this.paths
      .filter((p) => p.node === node)
      .forEach((p) => {
        p.bindingFunction.destroy()
      })
  }
})

module.exports = {
  onBindingDestroyed,
  onBindingGetProperty
}