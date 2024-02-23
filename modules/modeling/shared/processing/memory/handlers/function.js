const Function = require('../../../types/Function')

module.exports = {
  for: Function,
  async parse(scope, object, context) {
    if (!Array.isArray(object)) {
      throw new Error('not ok')
    }
    let [args, body] = object
    const fn = {
      scope,
      source: context.source,
      value: null,
    }

    fn.value = async (...argsValues) => {
      const child = scope.child()
      args.forEach((arg, i) => {
        const type = context.definition.args[i].getType(context.source.type)
        const argObject = {
          value: argsValues[i],
          name: arg,
          sourceType: 'arg',
          function: fn,
          type,
        }
        child.variables[arg] = argObject
        return argObject
      })

      const value = await child.process(body)
      return value
    }
   
    return fn
  }
}