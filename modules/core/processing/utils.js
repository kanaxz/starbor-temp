const Global = require('../modeling/types/Global')

const getProperty = (scope, source, propertyName) => {
  const property = source.type.properties.find((p) => p.name === propertyName)
  if (!property) {
    throw new Error(`Property ${propertyName} not found`)
  }
  if (property.context && property.context !== 'mongo') {
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

  scope.onGetProperty(property, any)
  return any
}

const processObjectFilter = (scope, object) => {
  const functionCalls = Object.entries(object)
    .map(([k, v]) => {
      const functionCall = {
        $eq: [`$${k}`, v]
      }

      return functionCall
    })

  return processFunctionCall(scope, {
    $and: functionCalls,
  })
}

const processObject = (scope, object, context) => {
  console.log('processing object', object, context)
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

const parse = (scope, object, context) => {
  const type = context.definition.type.getType(context.source.type)
  const handlers = scope.getHandlers(type)
  const handler = handlers.find((h) => h.parse)
  if (!handler) {
    console.error("error here", object, context)
    throw new Error(`Could not find handler for parse on type ${type.definition.name}`)
  }
  return handler.parse(scope, object, context)
}

const callFunction = (scope, source, method, args = []) => {
  const handlers = scope.getHandlers(source.type)
  const handler = handlers.find((h) => h.methods[method.name])
  //console.log('calling', source.value, method.name, handlers.map((h) => h.methods))
  args.unshift(source.type === Global ? scope : source)
  return handler.methods[method.name](...args)
}

const getArgs = (scope, source, method, argsObjects) => {
  const args = []
  for (let i = 0; i < argsObjects.length; i++) {
    const definition = method.args[i]
    if (!definition) {
      console.log(`Cannot parse arg from method ${method.name} at index ${i}`)
    }
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
  const globalMethod = Global.methods.find((m) => m.name === methodName)
  if (globalMethod) {
    source = {
      type: Global,
    }
    argsObjects = callObject
  } else {
    [sourceObject, ...argsObjects] = callObject
    source = processObject(scope, sourceObject)
  }

  console.log({
    methodName,
    argsObjects,
    source
  })

  const method = source.type.methods.find((m) => m.name === methodName)
  if (!method) {
    console.error(source.type)
    throw new Error(`Method '${methodName}' not found`)
  }

  const args = getArgs(scope, source, method, argsObjects)
  console.log({ args })
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



module.exports = {
  processObject,
  processFunctionCall,
  processObjectFilter,
}