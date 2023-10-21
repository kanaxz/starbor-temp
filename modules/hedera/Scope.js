const mixer = require('core/mixer')
const { workers } = require('./global')
const Destroyable = require('core/mixins/Destroyable')
const Eventable = require('core/mixins/Eventable')

const attributes = {
  class(node, value) {
    value.split(' ').forEach((cssClass) => {
      node.classList.add(cssClass)
    })
  },
}

module.exports = class Scope extends mixer.extends([Destroyable, Eventable]) {
  constructor({ source, parent, variables }) {
    super()
    this.parent = parent
    this.nodes = []
    this.variables = {
      ...(this.parent?.variables || {}),
      ...(variables || {}),
    }
    if (source) {
      this.variables.this = source
    }
  }

  child(options = {}) {
    return new Scope({
      parent: this,
      ...options
    })
  }

  async processSelf(node) {
    if (node.nodeName !== 'SELF') {
      return false
    }
    [...node.attributes]
      .forEach((attr) => {
        node.removeAttribute(attr.name)
        const attrType = attributes[attr.name]
        if (attrType) {
          attrType(node, attr.value)
        } else {
          node.parentElement.setAttribute(attr.name, attr.nodeValue)
        }

      })

    const parent = node.parentElement
    node.remove()
    while (node.childNodes.length) {
      parent.appendChild(node.childNodes[0])
    }

    this.process(parent)
    await this.renderVirtuals(parent)
    await this.renderContent(parent)
    return true
  }

  process(node) {
    const variables = {
      ...this.variables,
      node,
    }
    workers.forEach((w) => w.process(node, variables))
  }


  async renderContent(node) {
    await Promise.all([...node.childNodes].map((n) => this.render(n)))
  }

  async render(node) {

    if (await this.processSelf(node)) {
      return
    }
    if (node.process) {
      if (!await node.process(this)) {
        return
      }
    } else {
      if (node.processedScope) {
        return
      }
      // We apply processedScope before process so that if a worker/virtual (like v-child) move an element, it wont be processed again
      node.processedScope = this
      this.process(node)
      if (!await this.renderVirtuals(node)) {
        await this.renderContent(node)
      }
    }
    this.nodes.push(node)
  }

  async renderVirtuals(node) {
    let takeControl = false
    if (node.v) {
      for (const virtual of Object.values(node.v)) {
        if (await virtual.attach(this)) {
          if (takeControl) {
            throw new Error()
          }
          takeControl = true
        }
      }
    }
    return takeControl
  }

  destroyChild(node) {

    const index = this.nodes.indexOf(node)
    if (index === -1) {
      return
    }
    if (node.destroy) {
      node.destroy()
    } else {
      workers.forEach((w) => w.destroy && w.destroy(node))
      if (node.v) {
        for (const virtual of Object.values(node.v)) {
          virtual.destroy(true)
        }
      }
      this.destroyContent(node)
    }

    this.nodes.splice(index, 1)
  }

  destroyContent(node) {
    if (node.childNodes) {
      const nodes = [...node.childNodes]
      nodes.forEach((n) => this.destroyChild(n))
    }
  }

  destroy() {
    super.destroy()
    const nodes = [...this.nodes]
    nodes.forEach((node) => {
      this.destroyChild(node)
    })
    this.nodes = null
  }
}
