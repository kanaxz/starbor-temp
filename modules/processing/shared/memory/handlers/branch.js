const Branch = require('modeling/types/Branch')

module.exports = {
  for: Branch,
  methods: {},
  getType: (type) => type.template,
}
