const mixer = require('../mixer')
const Global = require('../modeling/types/Global')

const getProperty = async (scope, source, propertyName) => {
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

  await scope.onGetProperty(property, any)
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

const processObject = async (scope, object, context) => {
  if (typeof object === 'object' && !Array.isArray(object)) {
    const keys = Object.keys(object)
    if (keys.length === 1 && keys[0].startsWith('$')) {
      return await processFunctionCall(scope, object)
    } else {
      return await processObjectFilter(scope, object)
    }

  } else if (typeof object === 'string' && object.startsWith('$')) {
    const path = object.substring(1)
    const [sourceName, ...propertiesNames] = path.split('.')
    //console.log('getting variable', sourceName, propertiesNames, scope)
    let source = scope.variables[sourceName]

    if (!source) {
      source = await getProperty(scope, scope.variables.this, sourceName)
    }

    if (!source) {
      throw new Error(`Source ${sourceName} not found`)
    }

    for (const propertyName of propertiesNames) {
      source = await getProperty(scope, source, propertyName)
    }

    return source
  }
  if (context) {
    const source = await parse(scope, object, context)
    console.log({ source })
    if (source) {
      return source
    }
  }
  console.error(object)
  throw new Error('Could not process object')
}

const getParseHandler = (scope, object, type) => {
  const typeHandlers = scope.getHandlers(type)
  const typeHandler = typeHandlers.find((h) => h.parse)
  if (typeHandler) {
    return typeHandler
  }

  for (const handler of scope.root.handlers) {
    if(!handler.for){
      console.log(handler)
    }
    if (mixer.is(handler.for.prototype, type) && handler.check && handler.check(object)) {
      const typeHandlers = scope.getHandlers(handler.for)
      const typeHandler = typeHandlers.find((h) => h.parse)
      return typeHandler
    }
  }

  return null
}


const parse = async (scope, object, context) => {
  const type = context.definition.type.getType(context.source.type)
  const handler = getParseHandler(scope, object, type)
  if (!handler) {
    throw new Error(`Could not find handler for parse on type ${type.definition.name} ${object}`)
  }
  const result = await handler.parse(scope, object, context)
  return result
}

const callFunction = async (scope, source, method, args = []) => {
  const handlers = scope.getHandlers(source.type)
  const handler = handlers.find((h) => h.methods[method.name])
  //console.log('calling', source.value, method.name, handlers.map((h) => h.methods))
  args.unshift(source.type === Global ? scope : source)
  const result = await handler.methods[method.name](...args)
  return result
}

const getArgs = async (scope, source, method, argsObjects) => {
  const args = []
  for (let i = 0; i < argsObjects.length; i++) {
    const definition = method.args[i]
    if (!definition) {
      throw new Error(`Cannot parse arg from method ${method.name} at index ${i}`)
    }
    let object = argsObjects[i]
    if (definition.spread) {

      object = argsObjects.slice(i)
      i = argsObjects.length
    }
    const arg = await processObject(scope, object, {
      source,
      definition,
    })
    args.push(arg.value)
  }
  return args
}

const processFunctionCall = async (scope, functionCall) => {

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
    source = await processObject(scope, sourceObject)
  }

  const method = source.type.methods.find((m) => m.name === methodName)
  if (!method) {
    console.error(source.type)
    throw new Error(`Method '${methodName}' not found`)
  }

  const args = await getArgs(scope, source, method, argsObjects)
  if ((method.args.length < args.length - (globalMethod ? 0 : 1))) {
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