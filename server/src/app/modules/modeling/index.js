const models = require('shared/types')
const exp = require('express')

const MongoCollection = require('../../../../../modules/core-server/mongo/MongoCollection')

const { rootModelTypes } = require('shared')

module.exports = {
  dependancies: ['auth', 'express', 'mongo'],
  async construct({ express, mongo }) {

    const controllers = []

    const controller = (type, controller) => {
      controllers.push({
        type,
        controller
      })
    }

    const router = new exp.Router()
    express.use('/api/collections', router)

    const collections = rootModelTypes.reduce((acc, type) => {
      acc[type.definition.pluralName] = new MongoCollection(type, mongo.db, controllers)
      return acc
    }, {})



    Object.entries(collections)
      .forEach(([collectionName, collection]) => {
        router.post(`/${collectionName}/find`, async (req, res) => {
          const [query, options = {}] = req.body
          //console.log('body', req.body, options)
          try {
            const models = await collection.find(req, query, options)
            const response = models.map((m) => m.toJSON(options.load))
            res.send(response)
          } catch (err) {
            console.error(err)
            res.status(500).send({})
          }

        })

        router.post(`/${collectionName}/create-or-update`, async (req, res) => {
          const [query, json] = req.body
          try {
            const model = await collection.createOrUpdate(req, query, json)
            const response = model.toJSON()
            res.send(response)
          } catch (err) {
            res.status(500).send({})
          }
        })

        router.post(`/${collectionName}/update`, async (req, res) => {
          const [query, patches] = req.body
          try {
            const model = await collection.update(req, query, patches)
            const response = model.toJSON()
            res.send(response)
          } catch (err) {
            console.error(err)
            res.status(500).send({})
          }
        })

        router.post(`/${collectionName}/create`, async (req, res) => {
          const [json] = req.body
          try {
            const model = await collection.create(req, json)
            const response = model.toJSON()
            res.send(response)
          } catch (err) {
            res.status(500).send({})
          }
        })
      })

    return {
      collections,
      controller
    }
  }
}