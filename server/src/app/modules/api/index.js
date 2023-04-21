const models = require('shared/models')
const exp = require('express')
const { buildPipeline, loadLookups, unloadLookup } = require('./mongo')

const objectDiff = (paths1, paths2) => {
  return Object.entries(paths1)
    .reduce((acc, [propertyName, value1]) => {
      let value2 = paths2[propertyName]
      if (!value2) {
        acc[propertyName] = true
      } else {
        if (value2 === true) {
          value2 = {}
        }
        if (value1 === true) {
          value1 = {}
        }
        const subDiff = objectDiff(value1, value2)
        if (Object.keys(subDiff).length) {
          acc[propertyName] = subDiff
        }
      }
      return acc
    }, {})
}

const merge = (load1, load2) => {
  const unload = objectDiff(load1, load2)
  const load = objectDiff(load2, load1)
  return { load, unload }
}

class Collection {
  constructor(mongodb, modelClass) {
    this.mongodb = mongodb
    this.mongoCollection = mongodb.collection(modelClass.definition.pluralName)
    this.modelClass = modelClass
  }
  find(query, options = {}) {
    const [pipeline, paths] = buildPipeline(this.modelClass, query)
    if (!options.load) {
      options.load = {}
    }
    console.log({ paths, load: options.load })
    const { load, unload } = merge(paths, options.load)
    console.log({ load, unload })
    pipeline.push(
      {
        $limit: options.limit || 50
      },
      ...unloadLookup(this.modelClass, unload),
      ...loadLookups(this.modelClass, load),
    )

    console.log(JSON.stringify(pipeline, null, ' '))

    return this.mongoCollection
      .aggregate(pipeline)
      .toArray()
  }
}

module.exports = {
  dependancies: ['express', 'mongo'],
  async construct({ express, mongo }) {

    const router = new exp.Router()
    express.use('/api', router)

    const collections = [models.locations.Location].reduce((acc, modelClass) => {
      acc[modelClass.definition.pluralName] = new Collection(mongo.db, modelClass)
      return acc
    }, {})


    Object.entries(collections)
      .forEach(([collectionName, collection]) => {
        router.post(`/${collectionName}/find`, async (req, res) => {
          const { query, options } = req.body
          const models = await collection.find(query, options)
          console.log(models.length)
          res.send(models)
        })
      })

    //console.log(models.locations.Location)

    const locations = await collections.locations.find([
      {
        is: ['$this', 'location']
      },

      {
        eq: ['$affiliation.name', 'UEE']
      }
      /**/
    ], {
      limit: 2,
      load: {
        affiliation: true,
      }
    })
    console.log(locations)

  }
}