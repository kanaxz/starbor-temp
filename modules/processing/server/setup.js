const { handleError } = require('core-server/errors')
const { Model } = require('modeling/types')
module.exports = async ({ map, collections, router, modeling }) => {
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
    return acc
  }, {})

  Object.assign(collections, _collections)

  for (const collection of Object.values(collections)) {
    await collection.build()
  }
  

  Object.entries(collections)
    .forEach(([collectionName, collection]) => {
      router.post(`/${collectionName}/find`, async (req, res) => {
        const { query, options = {} } = req.body
        //console.log('body', req.body, options)
        try {
          const models = await collection.find(req, query, options)
          const response = models.map((m) => m.toJSON(options.load))
          //console.log({ response })
          res.send(response)
        } catch (err) {
          handleError(res, err)
        }

      })

      router.post(`/${collectionName}/create-or-update`, async (req, res) => {
        const { query, json } = req.body
        try {
          const model = await collection.createOrUpdate(req, query, json)
          const response = model.toJSON()
          res.send(response)
        } catch (err) {
          handleError(res, err)
        }
      })

      router.post(`/${collectionName}/update`, async (req, res) => {
        const { query, patches } = req.body
        try {
          const model = await collection.update(req, query, patches)
          const response = model.toJSON()
          res.send(response)
        } catch (err) {
          handleError(res, err)
        }
      })

      router.post(`/${collectionName}/create`, async (req, res) => {
        const json = req.body
        try {
          const model = await collection.create(req, json)
          const response = model.toJSON()
          res.send(response)
        } catch (err) {
          handleError(res, err)
        }
      })
    })

}