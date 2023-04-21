const { getFileRoot } = require('../utils')
const { join } = require('path')
const config = require('../../../config')

const productsPath = join(config.dataPath, 'Libs/Subsumption/Shops/RetailProductPrices.xml')

module.exports = (services) => {
  const { items, locations } = services

  const [, products] = getFileRoot(productsPath)
  const match = (object, filter) => {
    for (const [property, value] of Object.entries(filter)) {
      if (!object[property] !== value) {
        return false
      }
    }
    return true
  }

  const getProduct = (filter, node) => {
    if (!node) { node = products }
    if (match(node, filter)) { return node }
    let childs = node.RetailProducts?.Node
    if (!childs) { return }

    if (!Array.isArray(childs)) {
      childs = [childs]
    }

    for (const child of childs) {
      const product = getProduct(filter, child)
      if (product) {
        return product
      }
    }

    return null
  }


  const processItemsStocks = async (itemStocks, service) => {
    for (const itemStock of itemStocks) {
      const item = items.find((i) => i.starcitizen.className === itemStock.Name)
      if (!item) { continue }

      const product = {
        '@type': 'itemStock',
        parent: service._id,
        item: item._id,
        price: itemStock.BasePrice,
      }

      await locations.collection.findOneAndUpdate(
        {
          parent: product.parent,
          item: product.item,
        },
        {
          $set: product
        },
        {
          upsert: true,
          returnNewDocument: true,
        })
    }
  }

  const processInventary = async (serviceJson, service) => {
    let itemStocks = serviceJson.ShopInventoryNodes.ShopInventoryNode
    if (!itemStocks) { return }
    if (!Array.isArray(itemStocks)) {
      itemStocks = [itemStocks]
    }

    itemStocks = itemStocks.map((itemStock) => getProduct({ ID: itemStock.InventoryID })).filter((o) => o)

    await processItemsStocks(itemStocks, service)
  }

  const save = async (service) => {
    return locations.save(service, true)
  }

  services.services = {
    save,
    processItemsStocks,
    processInventary,
    getProduct,
  }

  Object.assign(services.services, require('./parsers')(services))

  return services.services
}