const { Real } = require('../../../types')

module.exports = {
  for: Real,
  methods: {
    not({ value }) {
      return !value
    }
  }
}