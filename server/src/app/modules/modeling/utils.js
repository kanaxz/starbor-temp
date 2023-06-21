
const handlers = require('./handlers')
const mixer = require('core/mixer')
const Loadable = require('core/modeling/mixins/Loadable')
const globalHandler = require('./handlers/global')
const Global = require('core/modeling/types/Global')

const makePath = (...args) => args.filter((o) => o).join('.')

const getPath = (source) => {
  if (source.sourceType === 'arg') {
    return getPath(source.function.source)
  } else if (source.sourceType === 'var') {
    if (source.name !== 'this') {
      throw new Error('Cannot build path from source with type var')
    }
    return null
  } else if (source.sourceType === 'property') {
    let parent = getPath(source.owner)
    return makePath(parent, source.name)
  }
  throw new Error('Could build path from source')
}

const getProperty = (scope, source, propertyName) => {
  const property = source.type.properties.find((p) => p.name === propertyName)
  if (!property) {
    throw new Error(`Property ${propertyName} not found`)
  }
  if(property.context && property.context !== 'mongo'){
    throw new Error(`Property ${property.name} can only be used in context ${property.context}`)
  }
  const any = {
    sourceType: 'property',
    owner: source,
    scope,
    name: propertyName,
    value: [source.value, property.name].join('.'),
    type: property.type,
  }
  if (mixer.is(property.type.prototype, Loadable)) {
    const path = getPath(any)
    scope.load(path)
  }
  return any
}

const processObjectFilter = (scope, object) => {
  const functionCalls = Object.entries(object)
    .map(([k, v]) => {
      const functionCall = {
        $eq: [`$${k}`, v]
      }

      const { value } = processFunctionCall(scope, functionCall)
      return value
    })

  return {
    value: {
      $and: functionCalls
    }
  }
}

const processObject = (scope, object, context) => {
  if (typeof object === 'object' && !Array.isArray(object)) {
    const keys = Object.keys(object)
    if (keys.length === 1 && keys[0].startsWith('$')) {
      return processFunctionCall(scope, object)
    } else {
      return processObjectFilter(scope, object)
    }

  } else if (typeof object === 'string' && object.startsWith('$')) {
    const path = object.substring(1)
    const [sourceName, ...propertiesNames] = path.split('.')
    //console.log('getting variable', sourceName, propertiesNames, scope)
    let source = scope.variables[sourceName]

    if (!source) {
      source = getProperty(scope, scope.variables.this, sourceName)
    }

    if (!source) {
      throw new Error(`Source ${sourceName} not found`)
    }

    for (const propertyName of propertiesNames) {
      source = getProperty(scope, source, propertyName)
    }

    return source
  }
  if (context) {
    const source = parse(scope, object, context)
    if (source) {
      return source
    }
  }
  console.error(object)
  throw new Error('Could not process object')
}

const getHandlers = (type) => {
  let filteredHandlers = []
  while (type.prototype.__proto__) {
    const typeFilteredHandlers = handlers.filter((h) => {
      return h.for === type || type.dependencies && type.dependencies?.indexOf(h.for) !== -1
    })

    filteredHandlers.push(...typeFilteredHandlers)
    type = type.prototype.__proto__.constructor
  }
  return filteredHandlers
}

const parse = (scope, object, context) => {
  const type = context.definition.type.getType(context.source.type)
  const handlers = getHandlers(type)
  const handler = handlers.find((h) => h.parse)
  return handler.parse(scope, object, context)
}

const callFunction = (scope, source, method, args = []) => {
  const handlers = getHandlers(source.type)
  const handler = handlers.find((h) => h.methods[method.name])
  //console.log('calling', source.value, method.name, handlers.map((h) => h.methods))
  args.unshift(source.type === Global ? scope : source)
  return handler.methods[method.name](...args)
}

const getArgs = (scope, source, method, argsObjects) => {
  const args = []
  for (let i = 0; i < argsObjects.length; i++) {
    const definition = method.args[i]
    let object = argsObjects[i]
    if (definition.spread) {
      object = argsObjects.slice(i)
      i = argsObjects.length
    }
    const arg = processObject(scope, object, {
      source,
      definition,
    })
    args.push(arg.value)
  }
  return args
}

const processFunctionCall = (scope, functionCall) => {

  let methodName = Object.keys(functionCall)[0]
  if (!methodName.startsWith('$')) {
    throw new Error()
  }



  const callObject = functionCall[methodName]
  methodName = methodName.substring(1)

  let source
  let argsObjects
  if (globalHandler.methods[methodName]) {
    source = {
      type: Global,
    }
    argsObjects = callObject
  } else {
    [sourceObject, ...argsObjects] = callObject
    source = processObject(scope, sourceObject)
  }


  const method = source.type.methods.find((m) => m.name === methodName)
  if (!method) {
    console.error(source.type)
    throw new Error(`Method '${methodName}' not found`)
  }

  const args = getArgs(scope, source, method, argsObjects)

  if ((method.args.length < argsObjects.length - 1)) {
    throw new Error('Too many args')
  }

  const value = callFunction(scope, source, method, args)
  if (value === undefined) {
    throw new Error('Value not found')
  }

  const returnType = method.returnType.getType(source.type)

  return {
    sourceType: 'functionCall',
    owner: source,
    value,
    scope,
    type: returnType
  }
}

const buildLookups = (type, paths) => {
  return Object.entries(paths)
    .flatMap(([k, v]) => {
      console.log({ type })
      const property = type.properties.find((p) => p.name === k)
      if (!property) {
        throw new Error(`Could not find property ${k}`)
      }

      const handlers = getHandlers(property.type)
      const handler = handlers.find((h) => h.load)

      let pipeline = []
      if (v !== true) {
        const propertyType = handler.getType(property.type)
        pipeline = buildLookups(propertyType, v)
      }
      return handler.load(property, pipeline)
    })
}

const buildPipeline = (scope, and) => {
  const $and = scope.process(and)
  const pipeline = [
    ...buildLookups(scope.variables.this.type, scope.paths),
    {
      $match: {
        $expr: {
          $and,
        }
      },
    }]
  return pipeline
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

module.exports = {
  processObject,
  processFunctionCall,
  buildLookups,
  buildPipeline,
  unloadLookup,
  processObjectFilter
}