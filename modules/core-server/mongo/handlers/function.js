const Function = require('core/modeling/types/Function')

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
      value: {},
    }
    const child = scope.child()
    fn.value.args = args.map((arg, index) => {
      const type = context.definition.args[index].getType(context.source.type)
      const result = {
        value: `$$${arg}`,
        name: arg,
        sourceType: 'arg',
        function: fn,
        type,
      }
      child.variables[arg] = result
      return result
    })

    body = await child.process(body)
    fn.value.body = body
    return fn
  }
}