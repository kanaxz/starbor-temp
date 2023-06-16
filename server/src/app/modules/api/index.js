const models = require('shared/models')
const exp = require('express')

const Collection = require('./Collection')


module.exports = {
  dependancies: ['express', 'mongo'],
  async construct({ express, mongo }) {

    const router = new exp.Router()
    express.use('/api', router)

    const collections = [models.Entity, models.Organization].reduce((acc, type) => {
      acc[type.definition.pluralName] = new Collection(mongo.db, type)
      return acc
    }, {})



    Object.entries(collections)
      .forEach(([collectionName, collection]) => {
        router.post(`/${collectionName}/find`, async (req, res) => {
          const [query, options] = req.body
          try {
            const models = await collection.find(req, query, options)
            const response = models.map((m) => m.toJSON(null, options.load))
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
            console.log({ response })
            res.send(response)
          } catch (err) {
            console.error(err)
            res.status(500).send({})
          }
        })
      })


    const [result] = await collections.entities.find({}, [
      {
        $eq: ['$name', 'microTech']
      }
    ], {
      load: {
        parents: true,
      }
    })

    //console.log(result.parents)
    //console.log("json", result.toJSON({ parents: true }))

    //console.log(JSON.stringify(result, null, ' '))
    /**/
  }
}