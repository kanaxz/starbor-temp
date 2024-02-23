const { Object, Type } = require('../../../types')

const authorizedTypes = [Object]

const findType = (typeName) => {
  for (const type of authorizedTypes) {
    const types = type.getAllChilds()
    const childType = types.find((t) => t.definition.name === typeName)
    if (childType) {
      return childType
    }
  }
  return null
}

module.exports = {
  for: Type,
  parse(scope, value) {
    const type = findType(value)

    if (!type) {
      throw new Error()
    }


    return {
      scope,
      value: type,
    }
  }
}