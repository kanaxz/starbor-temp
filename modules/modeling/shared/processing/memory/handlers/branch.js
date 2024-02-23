const Branch = require('../../../types/Branch')

module.exports = {
  for: Branch,
  methods: {},
  getType: (type) => type.template,
}
