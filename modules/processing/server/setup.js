const { Model } = require('modeling/types')

module.exports = async ({ collections, map, modeling }) => {

  const rootModelTypes = Model
    .getAllChilds()
    .filter((t) => t.definition.root)

  const _collections = rootModelTypes.reduce((acc, type) => {
    const typeBuilderPair = map.find(([t]) => t === type || type.prototype instanceof t)
    if (!typeBuilderPair) {
      throw new Error(`Collection type not found for type ${type.definition.name}`)
    }
    const collectionBuilder = typeBuilderPair[1]
    const collection = collectionBuilder(type, modeling.controllers)
    acc[type.definition.pluralName] = collection
    type.collection = collection
    return acc
  }, {})

  Object.assign(collections, _collections)

  console.log('collections', Object.keys(collections))

  for (const collection of Object.values(collections)) {
    await collection.build()
  }
}