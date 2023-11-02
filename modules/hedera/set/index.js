const { workers } = require('../global')
const { set } = require('core/utils/path')
const { dashToCamel } = require('../utils')
const BindingFunction = require('./BindingFunction')
const BindingExpression = require('./BindingExpression')

const attributes = {
  class: (() => {
    const caches = []
    return (node, value, key) => {
      if(!value){
        value = ''
      }
      const classes = value.split(' ').filter((o) => o && ['undefined', 'false'].indexOf(o) === -1)
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

const PREFIX = ':'

workers.push({
  expressions: [],
  process(scope, node, variables) {
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
  process(scope, node, variables) {
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
  process(scope, node, variables) {
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

