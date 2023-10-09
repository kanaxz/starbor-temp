const HasMany = require('../../../modeling/types/HasMany')
const { makeId } = require('../../../utils/string')

module.exports = {
  for: HasMany,
  methods: {},
  getType: (type) => type.template,
}
