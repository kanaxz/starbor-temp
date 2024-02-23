const HasMany = require('../../../types/HasMany')

module.exports = {
  for: HasMany,
  methods: {},
  getType: (type) => type.template,
}
