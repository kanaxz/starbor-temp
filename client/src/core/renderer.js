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
  if (node.nodeName === 'SELF') {
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
  }
}

const render = async (node, scope) => {
  if (node.nodeName === 'SELF') {
    await processSelf(node, scope)
    return
  }


  if (isCustomElement(node)) {
    await customElements.whenDefined(node.tagName.toLowerCase());
  }

  process(node, scope)
  if (node.processed)
    await node.processed(scope)
  else if (node.v) {
    for (const virtual of Object.values(node.v)) {
      await virtual.processed(scope)
    }
  }
  else if (node.childNodes) {
    await renderContent(node, scope)
  }
}
const renderContent = async (node, scope) => {
  for (const child of node.childNodes) {
    await render(child, scope)
  }
}

const destroyContent = (node) => {
  if (node.childNodes) {
    node.childNodes.forEach(destroy)
  }
}

const destroy = (node) => {
  workers.forEach((w) => w.destroy && w.destroy(node))
  if (node.destructor) {
    node.destructor();
  } else {
    destroyContent(node)
  }
}


module.exports = {
  workers,
  render,
  process,
  renderContent,
  destroy,
  destroyContent,
}

