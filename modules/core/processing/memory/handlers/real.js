const { Real } = require('../../../modeling/types')

module.exports = {
  for: Real,
  methods: {
    not({ value }) {
      return !value
    }
  }
}