const { Array } = require('modeling/types')
const { chain } = require('core/utils/array')
const { pathsDiff } = require('core/utils/path')

const makePath = (...args) => args.filter((o) => o).join('.')

const getPromiseFunctions = () => {
  let resolve
  let reject
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  return {
    resolve,
    reject,
    promise,
  }
}

const findController = async (scope, type, pipeline, query) => {
  const controllers = scope.root.collection.getTypeControllers(type)

  let leftToRight = getPromiseFunctions()
  const tip = getPromiseFunctions()

  const promise = chain(controllers, async (controller, next) => {
    if (!controller.find) {
      return next()
    }
    return controller.find(scope.req, pipeline, query, next)
  }, async () => {
    const tmp = leftToRight
    leftToRight = null
    tmp.resolve()
    return tip.promise
  })

  promise.catch((err) => {
    if (leftToRight) {
      return leftToRight.reject(err)
    }
    throw err
  })

  await leftToRight
  return {
    tip,
    rightToLeft: promise,
  }
}

const buildLookup = async (scope, property, paths) => {
  const handlers = scope.getHandlers(property.type)
  const handler = handlers.find((h) => h.load)
  let type = property.type
  if(type.prototype instanceof Array){
    type = type.definition.template
  }
  let subPipeline = []
  const query = {}
  const controllers = await findController(scope, type, subPipeline, query)
  const { lookups, pipeline } = await processQuery(scope, type, query, {
    load: paths,
  })

  subPipeline.push(...pipeline)

  const rootPipeline = handler.load(property, subPipeline)

  return {
    property,
    paths,
    pipeline: rootPipeline,
    lookups,
    controllers
  }
}


const buildLookups = async (scope, type, paths) => {
  const lookups = []
  for (const [propertyName, subPaths] of Object.entries(paths)) {
    const property = type.properties.find((p) => p.name === propertyName)
    if (!property) {
      console.log(paths, type.definition.name)
      throw new Error(`Could not find property ${propertyName}`)
    }

    const lookup = await buildLookup(scope, property, subPaths)
    lookups.push(lookup)
  }
  return lookups
}

const processQuery = async (parentScope, type, query, options) => {
  const scope = parentScope.child()
  scope.variables = {
    this: {
      sourceType: 'var',
      name: 'this',
      value: '$$CURRENT',
      type: type,
    }
  }
  const { pipeline, lookups } = await buildPipeline(scope, query)
  if (!options.load) {
    options.load = {}
  }
  const { load, unload } = merge(scope.root.paths, options.load)
  const loadLookups = await buildLookups(scope, type, load)
  const lookupsPipeline = loadLookups.flatMap(({ pipeline }) => pipeline)
  pipeline.push(
    {
      $limit: Math.min(options.limit || 100)
    },
    ...unloadLookup(type, unload),
    ...lookupsPipeline,
  )
  return {
    pipeline,
    lookups: [
      ...lookups,
      ...loadLookups,
    ]
  }
}

const buildPipeline = async (scope, and) => {
  const $and = await scope.process(and)
  const lookups = await buildLookups(scope, scope.variables.this.type, scope.root.paths)
  const lookupsPipeline = lookups.flatMap(({ pipeline }) => pipeline)
  const pipeline = [
    ...lookupsPipeline,
    {
      $match: {
        $expr: {
          $and,
        }
      },
    }]
  return {
    pipeline,
    lookups,
  }
}

const unloadLookup = (modelClass, unload, path) => {
  return []
  const pipeline = Object.entries(unload)
    .flatMap(([propertyName, value]) => {
      const property = modelClass.properties.find((p) => p.name === propertyName)
      const propertyPath = makePath(path, propertyName)
      if (!property) {
        throw new Error('Property not found')
      }
      if (value === true) {
        return [{
          $addFields: {
            [propertyPath]: makePath(`$${propertyPath}`, '_id')
          }
        }]
      } else {
        return unloadLookup(property.type, value, propertyPath)
      }
    })
  return pipeline
}

const merge = (load1, load2) => {
  const load = pathsDiff(load2, load1)
  const unload = pathsDiff(load1, load2)
  return { load, unload }
}

module.exports = {
  buildPipeline,
  buildLookups,
  unloadLookup,
  merge,
  processQuery,
  makePath,
}