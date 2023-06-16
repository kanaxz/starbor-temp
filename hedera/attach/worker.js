const { set } = require('../utils/path')

const as = (node, { this: thisArg }) => {
  const as = node.getAttribute("as")
  if (!as) { return }
  //console.log('as',thisArg, as, node)
  set(thisArg, as, node)
}

const attach = (node, { this: thisArg }) => {
  if (!node.getAttribute('attach') || !node.id) { return }

  set(thisArg, node.id, node)
}

module.exports = {
  process(node, variables) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return }
    as(node, variables)
    attach(node, variables)
  }
}