const { String } = require.main.require('../../shared/core/modeling/objects')

module.exports = [String, {
  match({ value }, regex) {
    return {
      $regexMatch: {
        input: {
          $toUpper: value
        },
        regex: {
          $toUpper: regex
        },
      }
    }
  },
  toUpperCase({ value }) {
    return {
      $toUpper: value
    }
  },
  parse({ value }) {
    if (typeof value !== 'string') {
      throw new Error()
    }
    return value
  }
}]