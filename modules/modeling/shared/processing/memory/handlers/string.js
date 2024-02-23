const { String } = require('../../../types')

module.exports = {
  for: String,
  methods: {
    match({ value }, regex) {
      const regExp = new RegExp(regex.toUpperCase())
      return value.toUpperCase().match(regExp)
    },
    toUpperCase({ value }) {
      return value.toUpperCase()
    },
  },
  parse(scope, value) {
    if (typeof value !== 'string') {
      throw new Error()
    }
    return {
      scope,
      value,
    }
  }
}