const { Global } = require('modeling/types')

module.exports = {
  for: Global,
  methods: {
    and(scope, $and = []) {
      return {
        $and,
      }
    },
    or(scope, $or = []) {
      return {
        $or,
      }
    },
    if(scope, ...$cond) {
      return {
        $cond,
      }
    },
    async let(scope, vars, body) {
      const child = scope.child()
      Object.entries(vars)
        .forEach(([k, v]) => {
          child.variables[k] = {
            value: `$${k}`,
            sourceType: 'let',
            letArg: v,
          }
        })
      const $in = await child.process(body)
      return {
        $let: {
          vars,
          in: $in,
        }
      }
    }
  }
}