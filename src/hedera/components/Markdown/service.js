const { makeId } = require('sools-core/utils/string')

const variables = {}

const register = (value) => {
  const id = makeId()
  variables[id] = value
  return id
}

module.exports = {
  register,
  variables,
}