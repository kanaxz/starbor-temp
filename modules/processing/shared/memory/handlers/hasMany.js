const HasMany = require('modeling/types/HasMany')

module.exports = {
  for: HasMany,
  methods: {},
  getType: (type) => type.template,
}
