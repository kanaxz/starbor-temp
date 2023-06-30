
const rootNode = {
  name: 1,
  nodes: [{
    name: 2,
    nodes: [{
      name: 3,
    }, {
      name: 4,
    }]
  }, {
    name: 5,
  }]
}

const [, cédric, albane] = ['sacha', 'cédric', 'Albane']

const logNode = (node, deepth = 0) => {
  const spaces = Array.from(new Array(deepth))
    .map((() => ' ')).join('')

  node.nodes?.forEach((childNode) => {
    logNode(childNode, deepth + 1)
  })
}

logNode(rootNode)

class Object {}

class Model extends Object {}

class User extends Model {}
class Group extends Model {}