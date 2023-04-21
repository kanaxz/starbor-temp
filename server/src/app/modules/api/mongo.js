const classesMatch = (c1, c2) => c1 === c2 || c1.prototype instanceof c2
const handlers = require('./handlers')
const Model = require.main.require('core/modeling/Model')

const makeId = (length = 12) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return `var${result}`
}

const processObject = (objectClass, object, load, expectedClass) => {
  if (typeof object === 'object') {
    return processFunctionCall(objectClass, object, load)
  } else if (typeof object === 'string' && object.startsWith('$')) {

    if (object === '$this') {
      return {
        value: '$$CURRENT',
        class: objectClass,
      }
    }
    const split = object.substring(1).split('.')
    for (const segment of split) {
      const property = objectClass._properties[segment]
      console.log(objectClass)
      if (!property) {
        throw new Error(`Property ${segment} not found`)
      }
      if (property.type.prototype instanceof Model) {
        load(segment)
      }
      objectClass = property.type


    }

    return {
      value: object,
      class: objectClass,
    }

  }
  if (expectedClass) {
    const value = callFunction({
      class: expectedClass,
      value: object,
    }, {
      name: 'parse',
    })
    if (value !== undefined) {
      return {
        class: expectedClass,
        value
      }
    }
  }
  console.log(object, expectedClass)
  throw new Error('not ok')
}

const callFunction = (source, method, args = []) => {
  for (const [modelClass, methods] of handlers) {
    if (classesMatch(source.class, modelClass)) {
      if (methods[method.name]) {
        return methods[method.name](source, ...args)
      }
    }
  }
  return undefined
}

const getClass = (c, parent) => {
  if (c === THIS) {
    return parent
  }
  return c
}

const processFunctionCall = (objectClass, functionCall, load) => {

  const methodName = Object.keys(functionCall)[0]
  const callObject = functionCall[methodName]
  let sourceObject
  let argsObjects
  if (Array.isArray(callObject)) {
    [sourceObject, argsObjects] = callObject
    if (!Array.isArray(argsObjects)) {
      argsObjects = [argsObjects]
    }
  } else {
    sourceObject = callObject
    argsObjects = []
  }
  const source = processObject(objectClass, sourceObject, load)
  const method = source.class._methods[methodName]
  if (!method) {
    console.log(source.class)
    throw new Error(`Method '${methodName}' not found`)
  }

  if ((method.args.length < argsObjects.length - 1)) {
    throw new Error('Too many args')
  }

  const args = argsObjects.map((object, index) => {
    const excpectedClass = getClass(method.args[index], source.class)
    const arg = processObject(objectClass, object, load, excpectedClass)

    if (!classesMatch(arg.class, excpectedClass)) {
      throw new Error()
    }
    return arg.value
  })

  const value = callFunction(source, method, args)

  //console.log(source.value, method)
  if (value === undefined) {
    throw new Error('Value not found')
  }

  const returnType = getClass(method.returnType, source.class)

  return {
    value,
    class: returnType
  }
}

const operators = {
  and(modelClass, object, load) {
    const and = []
    for (const functionCall of object) {
      const source = processFunctionCall(modelClass, functionCall, load)
      and.push(source.value)
    }
    return and
  }
}

const loadLookups = (objectClass, paths) => {
  const lookups = Object.entries(paths)
    .flatMap(([propertyName, subPaths]) => {
      console.log('path', propertyName)
      const property = objectClass._properties[propertyName]
      const identityName = property.identity || 'main'
      const identity = property.type._identities[identityName]
      const id = makeId()
      let expr
      if (identity.length === 1) {
        expr = {
          $eq: [`$${identity[0]}`, `$$${id}`]
        }
      } else {
        expr = {
          $and: identity.map((propertyName) => {
            return { $eq: [`$${propertyName}`, `$$${id}.${propertyName}`] }
          })
        }
      }
      const collectionName = property.type.definition.pluralName

      return [{
        $lookup: {
          from: collectionName,
          as: property.name,
          let: { [id]: `$${property.name}` },
          pipeline: [
            {
              $match: {
                $expr: expr,
              }
            },
          ]
        }
      }, {
        $addFields: {
          [property.name]: {
            $first: `$${property.name}`
          }
        }
      }]
    })
  return lookups
}

const buildPipeline = (modelClass, and) => {

  const paths = {}
  const load = (path) => {
    const split = path.split('.')
    let current = paths
    for (const segment of split) {
      if (!current[segment]) {
        current[segment] = {}
      }
      current = current[segment]
    }
  }
  const $and = operators.and(modelClass, and, load)
  const pipeline = [
    ...loadLookups(modelClass, paths),
    {
      $match: {
        $expr: {
          $and: $and,
        }
      },
    }]
  console.log(paths)
  return [pipeline, paths]
}

const makePath = (...args) => {
  args = args.filter((o) => o)
  return args.join('.')
}

const unloadLookup = (modelClass, unload, path) => {
  const pipeline = Object.entries(unload)
    .flatMap(([propertyName, value]) => {
      const property = modelClass._properties[propertyName]
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
  loadLookups,
  buildPipeline,
  unloadLookup
}