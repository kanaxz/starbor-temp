const Any = require.main.require('core/modeling/Any')

module.exports = [Any, {
  not(source) {
    return {
      $not: [source.value]
    }
  }
}]