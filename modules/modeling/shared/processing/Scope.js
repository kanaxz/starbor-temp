
const proto = require('core/utils/proto')
const mixer = require('core/mixer')
const Global = require('../types/Global')
const Any = require('../types/Any')


module.exports = class Scope {
  constructor(values) {
    Object.assign(this, values)
    this.variables = {
      __proto__: (this.parent?.variables || {})
    }
  }

  get root() {
    return this.parent?.root || this
  }

  getHandlers(type) {
    const typeHandlers = proto.get(type)
      .flatMap((t) => {
        const tHandlers = this.root.handlers.filter((h) => {
          return h.for === t || t.dependencies && t.dependencies?.indexOf(h.for) !== -1
        })
        return tHandlers
      })
    return typeHandlers
  }

  child() {
    const child = new this.constructor({
      parent: this,
    })
    return child
  }

  async process(body) {
    const source = await this.processFunctionCall({
      $and: body
    })
    return source.value
  }

  async processFunctionCall(functionCall) {

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
      const [sourceObject, ...temp] = callObject
      argsObjects = temp
      source = await this.processObject(sourceObject)
    }

    const method = source.type.methods.find((m) => m.name === methodName)
    if (!method) {
      console.error(source.type)
      throw new Error(`Method '${methodName}' on type ${source.type.definition.name} not found`)
    }

    const args = await this.getArgs(source, method, argsObjects)
    if ((method.args.length < args.length - (globalMethod ? 0 : 1))) {
      throw new Error('Too many args')
    }

    const value = await this.callFunction(source, method, args.map((a) => a.value))
    if (value === undefined) {
      throw new Error('Value not found')
    }

    if (!method.returnType.getType) {
      console.error(method)
      throw new Error('returnType.getType missing')
    }

    const returnType = method.returnType.getType(source.type, args)
    if (!returnType) {
      console.log(method.name, args, returnType)
      throw new Error('Return type missing')
    }

    return {
      sourceType: 'functionCall',
      owner: source,
      method,
      value,
      scope: this,
      args,
      type: returnType
    }
  }

  async getArgs(source, method, argsObjects) {
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
      const arg = await this.processObject(object, {
        source,
        definition,
      })
      args.push(arg)
    }
    return args
  }

  async parse(object, context) {
    const type = context.definition.type.getType(context.source.type)
    const handler = this.getParseHandler(object, type)
    if (!handler) {
      console.log(object)
      throw new Error(`Could not find handler for parse on type ${type.definition.name} ${object}`)
    }
    const result = await handler.parse(this, object, context)
    return result
  }

  async callFunction(source, method, args = []) {
    const handlers = this.getHandlers(source.type)
    const handler = handlers.find((h) => h.methods[method.name])
    if (!handler) {
      throw new Error(`No handler found for method '${method.name}' on type ${source.type.definition.name}`)
    }
    //console.log('calling', source.value, method.name, handlers.map((h) => h.methods))
    args = [source.type === Global ? this : source, ...args]
    const result = await handler.methods[method.name](...args)
    return result
  }

  getParseHandler(object, type) {
    const typeHandlers = this.getHandlers(type)
    const typeHandler = typeHandlers.find((h) => h.parse)
    if (typeHandler) {
      return typeHandler
    }

    for (const handler of this.root.handlers) {
      if (mixer.is(handler.for.prototype, type) && handler.check && handler.check(object)) {
        const typeHandlers = this.getHandlers(handler.for)
        const typeHandler = typeHandlers.find((h) => h.parse)
        return typeHandler
      }
    }

    return null
  }

  async processObject(object, context) {
    if (object === null) {
      return {
        type: Any,
        value: null,
      }
    }
    //console.log("processObject", JSON.stringify(object, null, ' '))
    if (typeof object === 'string' && object.startsWith('$')) {
      const path = object.substring(1)
      const [sourceName, ...propertiesNames] = path.split('.')
      //console.log('getting variable', sourceName, propertiesNames, scope)
      let source = this.variables[sourceName]

      if (!source) {
        source = await this.getProperty(this.variables.this, sourceName)
      }

      if (!source) {
        throw new Error(`Source ${sourceName} not found`)
      }

      for (const propertyName of propertiesNames) {
        source = await this.getProperty(source, propertyName)
      }

      return source
    }

    if (typeof object === 'object' && !Array.isArray(object)) {
      const keys = Object.keys(object)
      if (keys.length === 1 && keys[0].startsWith('$')) {
        return await this.processFunctionCall(object)
      }
    }

    if (context) {
      const source = await this.parse(object, context)
      if (source) {
        return source
      }
    }

    console.error(object, context)
    throw new Error('Could not process object')
  }


  async getProperty(source, propertyName) {
    const property = source.type.properties.find((p) => p.name === propertyName)

    if (!property) {
      console.log(source.type)
      throw new Error(`Property ${propertyName} on type ${source.type.definition.name} not found`)
    }
    if (property.context && property.context !== 'mongo') {
      throw new Error(`Property ${property.name} can only be used in context ${property.context}`)
    }

    const value = await this.innerGetProperty(property, source)
    const any = {
      sourceType: 'property',
      owner: source,
      scope: this,
      name: propertyName,
      value,
      type: property.type,
    }

    await this.onGetProperty(property, any)
    return any
  }

  async innerGetProperty(property, source) {
    throw new Error('Not implemented')
  }

  onGetProperty() { }

  clone() {
    return new this.constructor({
      ...this,
      parent: null,
    })
  }
}