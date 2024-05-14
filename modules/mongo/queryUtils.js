const { Array } = require('modeling/types')
const { pathsDiff, pathsCopy } = require('core/utils/path')

const makePath = (...args) => args.filter((o) => o).join('.')
const letName = '__let__'
const map = {
  mongo: async (scope, stage) => ([stage]),
  let: async (scope, stage) => {

    const initialPaths = pathsCopy(scope.root.paths)
    const letObject = {}
    for (const [k, v] of Object.entries(stage)) {
      const value = await scope.processObject(v)
      scope.variables[k] = {
        sourceType: 'var',
        name: k,
        letArg: value,
        value: `$${letName}.${k}`,
        type: value.type,
      }

      letObject[k] = value.value
    }
    const lookups = await buildLookups(scope, initialPaths, scope.root.paths)

    return [
      ...lookups,
      {
        $addFields: {
          [letName]: letObject
        }
      }
    ]
  },
  filter: async (parentScope, stage) => {

    const scope = parentScope.child()
    const initialPaths = pathsCopy(scope.root.paths)
    //console.log({ initialPaths })
    const pipeline = []


    // query
    const $and = await scope.process(stage)
    pipeline.push({
      $match: {
        $expr: {
          $and,
        }
      },
    })

    // load

    const lookups = await buildLookups(scope, initialPaths, scope.root.paths)
    pipeline.unshift(...lookups)
    return pipeline
  }
}

const buildLookup = async (scope, property, paths) => {
  const handlers = scope.getHandlers(property.type)
  const handler = handlers.find((h) => h.load)
  let type = property.type
  if (type.prototype instanceof Array) {
    type = type.definition.template
  }
  const subScope = scope.root.clone()

  subScope.variables = {
    this: {
      sourceType: 'var',
      name: 'this',
      value: '$$CURRENT',
      type: type,
    }
  }

  const details = {
    relation: true,
    property,
  }

  const stages = await scope.root.collection.queryController(scope.root.req, type, [], details)
  const pipeline = await processStages(subScope, stages, {
    load: paths,
  })

  const rootPipeline = handler.load(property, pipeline)
  return rootPipeline
}


const buildLookups = async (scope, initialPaths, targetPaths, details) => {
  const paths = pathsDiff(targetPaths, initialPaths)
  const lookups = []
  for (const [varName, varPaths] of Object.entries(paths)) {
    const type = scope.variables[varName].type
    for (const [propertyName, subPaths] of Object.entries(varPaths)) {
      const property = type.properties.find((p) => p.name === propertyName)
      if (!property) {
        console.log(paths, type.definition.name)
        throw new Error(`Could not find property ${propertyName} on ${type.name}`)
      }

      const lookup = await buildLookup(scope, property, subPaths, details)
      lookups.push(...lookup)
    }
  }
  return lookups
}


const processStages = async (scope, stages, options) => {
  const pipeline = []
  for (let stage of stages) {
    const stageType = Object.keys(stage)[0]
    const stageProcess = map[stageType]
    if (!stageProcess) {
      console.log(stage)
      throw new Error(`Stage ${stageType} not found`)
    }

    const stagePipeline = await stageProcess(scope, stage[stageType])
    pipeline.push(...stagePipeline)
  }

  pipeline.push({
    $limit: Math.min(options.limit || 100)
  })

  if (options.load) {
    const lookups = await buildLookups(scope, scope.root.paths, { this: options.load })
    pipeline.push(...lookups)
  }

  return pipeline
}

module.exports = {
  buildLookups,
  processStages,
  makePath,
}