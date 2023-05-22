const models = require('shared/models')
const exp = require('express')
const { buildPipeline, buildLookups, unloadLookup } = require('./utils')
const mixer = require('core/mixer')
const Scope = require('./Scope')

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
    const scope = new Scope()
    scope.variables.this = {
      sourceType: 'var',
      name: 'this',
      value: '$$CURRENT',
      type: this.modelClass,
    }
    const pipeline = buildPipeline(scope, query)
    if (!options.load) {
      options.load = {}
    }
    const { load, unload } = merge(scope.paths, options.load)
    pipeline.push(
      {
        $limit: options.limit || 50
      },
      ...unloadLookup(this.modelClass, unload),
      ...buildLookups(this.modelClass, load),
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
          try {
            const models = await collection.find(query, options)
            res.send(models)
          } catch (err) {
            res.status(500).send({})
          }

        })
      })

    //console.log(models.locations.Location)

    const locations = await collections.locations.find([
      {
        $or: [{
          $eq: ['$name', 'Stanton']
        }]
      },
      /**/
    ], {
      limit: 2,
      /*
        load: {
        affiliation: true,
      }
      */
    })
    console.log(locations)

  }
}