const { Model } = require('modeling/types')
const Collection = require('./Collection')
const Instances = require('./Instances')

const collectionsTypesMap = [
  [Model, Collection]
]

const buildCollections = (url, options = {}) => {
  const rootModelTypes = Model
    .getAllChilds()
    .filter((t) => t.definition.root)
  const collections = rootModelTypes.reduce((acc, type) => {
    const collectionTypePair = collectionsTypesMap.find(([t]) => t === type || type.prototype instanceof t)
    if (!collectionTypePair) {
      throw new Error(`Collection type not find for type '${type.definition.name}'`)
    }
    const collectionType = collectionTypePair[1]
    const instances = new Instances(type)
    const collection = new collectionType({ type, url, instances, ...options })
    acc[type.definition.pluralName] = collection
    Object.assign(type,{
      collection,
      instances
    })
    return acc
  }, {})
  return collections
}

module.exports = {
  collectionsTypesMap,
  buildCollections,
}