const Branch = require('../../../modeling/types/Branch')
const { makeId } = require('../../../utils/string')

module.exports = {
  for: Branch,
  methods: {},
  getType: (type) => type.template,
}
