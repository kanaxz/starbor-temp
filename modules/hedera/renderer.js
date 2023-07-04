const { isCustomElement } = require("./utils");

const workers = []

const process = (node, scope) => {
  const variables = {
    ...scope.variables,
    node,
  }
  workers.forEach((w) => w.process(node, variables))
}

const attributes = {
  class(node, value) {
    value.split(' ').forEach((cssClass) => {
      node.classList.add(cssClass)
    })
  },
}

const processSelf = async (node, scope) => {
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

  process(parent, scope)
  await renderContent(parent, scope)
  return true
}

const renderVirtuals = async (node, scope) => {
  let takeControl = false
  if (node.v) {
    for (const virtual of Object.values(node.v)) {
      if (await virtual.attach(scope)) {
        if(takeControl){
          throw new Error()
        }
        takeControl = true
      }
    }
  }
  return takeControl
}

const render = async (node, scope) => {
  if (await processSelf(node, scope)) {
    return
  }

  if (isCustomElement(node)) {
    await customElements.whenDefined(node.tagName.toLowerCase());
  }
  if (node.process) {
    await node.process(scope)
  } else {
    process(node, scope)
    if (!await renderVirtuals(node, scope)) {
      await renderContent(node, scope)
    }
  }
}
const renderContent = async (node, scope) => {
  const nodes = [...node.childNodes]
  for (const child of nodes) {
    await render(child, scope)
  }
}

const destroyContent = (node) => {
  if (node.childNodes) {
    node.childNodes.forEach(destroy)
  }
}

const destroy = (node) => {
  if (node.destroy) {
    node.destroy(true)
  } else {
    workers.forEach((w) => w.destroy && w.destroy(node))
    if (node.v) {
      for (const virtual of Object.values(node.v)) {
        virtual.destroy(true)
      }
    }
    destroyContent(node)
  }
}


module.exports = {
  renderVirtuals,
  workers,
  render,
  process,
  renderContent,
  destroy,
  destroyContent,
}

