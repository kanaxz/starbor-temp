const Model = require('core/modeling/types/Model')
const Branch = require('core/modeling/types/Branch')

class Node extends Model {

}
Node
  .define({
    name: 'node',
    pluralName: 'nodes',
  })
  .properties({
    parent: Node,
    parents: {
      type: Branch.of(Node),
      on: 'parent',
    }
  })

module.exports = Node