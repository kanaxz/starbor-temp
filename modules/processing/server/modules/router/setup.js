const { handleError } = require('core-server/errors')
const { Model } = require('modeling/types')

module.exports = async ({ processing, router }) => {
  const { collections } = processing
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
        const { query, modelJson } = req.body
        try {
          const model = await collection.createOrUpdate(req, query, modelJson)
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