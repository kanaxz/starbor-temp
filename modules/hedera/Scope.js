const mixer = require('core/mixer')
const { workers } = require('./global')
const Destroyable = require('core/mixins/Destroyable')
const Eventable = require('core/mixins/Eventable')
const Vars = require('./Vars')
const { moveAttributes } = require('./utils')
const BindingFunction = require('./set/BindingFunction')

workers.push({
  process(scope, node, variables) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return }
    if (!node.hasAttribute('slot')) { return }
    const slotName = node.getAttribute('slot') || 'main'
    node.removeAttribute('slot')
    if (scope.slots[slotName]) {
      throw new Error(`Slot ${slotName} already exists`)
    }
    scope.slots[slotName] = {
      node,
      children: [...node.childNodes]
    }
  }
})


const processors = [
  async (scope, node) => {
    if (node.nodeName !== 'SELF') {
      return false
    }

    // move self content
    const parent = node.parentElement
    node.remove()
    while (node.childNodes.length) {
      parent.appendChild(node.childNodes[0])
    }

    // move attributes
    const component = scope.variables.this
    moveAttributes(node, component)
    scope.process(component)

    // process
    if (await scope.renderVirtuals(component)) {
      return true
    }
    await scope.renderContent(parent)
    return true
  },
  async (scope, node) => {
    if (node.nodeName !== 'SUPER') {
      return false
    }

    // process super attributes
    const component = scope.variables.this
    moveAttributes(node, component)
    scope.process(component)

    // process super template
    const nextDefinition = scope.type.definitions.filter((d) => d.template)[1]
    if (!nextDefinition) {
      throw new Error(`Cannot invoke 'super' as there is no parent with a template`)
    }
    const initialContent = [...node.childNodes]

    // create a temp div and set inner-html, and use child nodes to replace super node
    const container = document.createElement('div')
    container.innerHTML = nextDefinition.template
    const superNodes = [...container.childNodes]
    node.replaceWith(...superNodes)

    // render new child nodes
    const childScope = scope.child()
    childScope.type = nextDefinition.owner
    childScope.slots = {}
    for (const node of superNodes) {
      await childScope.render(node)
    }

    // process super content
    await scope.renderVirtuals(component)
    await childScope.renderSlots(initialContent)


    return true
  },
  async (scope, node) => {

    //console.log('before super-slot', node.nodeName, node.nodeName === 'SUPER-SLOT')
    if (node.nodeName !== 'SUPER-SLOT') {
      return false
    }

    node.replaceWith(...scope.currentSlot.children)
    return true
  },
  async (scope, node) => {
    //console.log('before super-slot', node.nodeName, node.nodeName === 'SUPER-SLOT')
    if (node.nodeName !== 'VARS') {
      return false
    }
    const vars = scope.variables.$
    for (const attribute of node.attributes) {
      console.log({ attribute })
      const propertyName = attribute.name.replace(':', '')
      vars.defineProperty({
        name: propertyName
      })

      const bindingFunction = new BindingFunction(attribute.value, scope.variables, (value) => {
        console.log('updating', scope, vars, propertyName, value)
        vars[propertyName] = value
      })

      vars.on(`propertyChanged:${propertyName}`, () => {
        console.log(propertyName, 'was changed', vars)
      })
      vars.bindingFunctions.push(bindingFunction)
    }
    node.remove()
    return true
  },
]

const findFirstNode = (nodes) => {
  for (node of nodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
      continue
    }
    return node
  }
  return null
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
    this.variables.$ = new Vars()
    this.slots = {}
  }

  child(options = {}) {
    return new Scope({
      parent: this,
      ...options
    })
  }

  async renderSlots(nodes, renderScope) {
    if (!nodes.length) { return }
    if (!renderScope) {
      renderScope = this
    }
    const renderSlot = async (slotName, nodes) => {
      const slot = this.slots[slotName]
      if (!slot) {
        throw new Error(`Slot ${slotName} not found`)
      }
      this.currentSlot = slot

      const { node } = slot
      node.replaceChildren(...nodes)
      for (const node of nodes) {
        await renderScope.render(node)
      }

      // it means it wasn't called in the initialize of the component
      if (renderScope === this) {
        this.parent.slots[slotName] = {
          node,
          children: [...node.childNodes],
        }
      }

    }
    const firstNode = findFirstNode(nodes)
    if (!firstNode) {
      return
    }
    if (firstNode.nodeName !== 'SLOT') {
      await renderSlot('main', nodes)
    } else {
      const slots = [...nodes].filter((n) => n.nodeType === Node.ELEMENT_NODE)
      for (const slot of slots) {
        const slotName = slot.getAttribute('name') || 'main'
        console.log([...slot.childNodes], slotName)
        await renderSlot(slotName, [...slot.childNodes])
      }
    }

  }

  process(node) {
    const variables = {
      ...this.variables,
      node,
    }
    workers.forEach((w) => w.process(this, node, variables))
  }


  async renderContent(node) {
    for (const child of [...node.childNodes]) {
      await this.render(child)
    }
    //await Promise.all([...node.childNodes].map((n) => this.render(n)))
  }

  async render(node) {
    for (const processor of processors) {
      if (await processor(this, node)) {
        return
      }
    }

    if (node.render) {
      node = await node.render(this)
      if (!node) {
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
      this.nodes.push(node)
    }

    return node
  }

  async renderVirtuals(node) {
    let preventRender = false
    if (node.v) {
      for (const virtual of Object.values(node.v)) {
        if (await virtual.attach(this)) {
          preventRender = true
        }
      }
    }
    return preventRender
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
    while (this.nodes.length) {
      this.destroyChild(this.nodes[0])
    }
    this.nodes = null
  }
}
