const { getFileRoot } = require('../utils')
const { join } = require('path')
const config = require('../../../config')
const layoutsPath = join(config.dataPath, 'Libs/Subsumption/Shops/ShopLayouts.xml')

module.exports = async (services) => {
  services = require('./service')(services)
  const [, json] = getFileRoot(layoutsPath)

  const processNodes = async (nodes, parent) => {
    for (const node of nodes) {
      if (!node.ShopLayoutNodes?.ShopLayoutNode) {
        console.log('service', node.Name)
        await services.parse(node, parent)
      } else {
        let childs = node.ShopLayoutNodes.ShopLayoutNode
        if (!Array.isArray(childs)) {
          childs = [childs]
        }
        await processNodes(childs, node)
      }
    }
  }

  await processNodes(json.ShopLayoutNodes.ShopLayoutNode, null)
}