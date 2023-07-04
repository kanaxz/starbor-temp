const { Model, Object } = require("core/modeling/types")


const validate = (type, mode, object1, object2) => {
  const properties = type.properties
  properties.forEach((property) => {
    const value1 = object1[property.name]
    const value2 = object2[property.name]

    if (property.required && value == null) {
      throw new Error(`Property ${property.name} is required`)
    }
    if (mode === 'update' && property.readonly === true && !this.equals(value1, value2)) {
      throw new Error(`Cannot update property ${property.name}`)
    }
    if (property.set === false && !this.equals(value1, value2)) {
      throw new Error(`Cannot set property ${property.name}`)
    }
    if (value1 && value1 instanceof Object && !(value1 instanceof Model)) {
      validate(property.type, mode, value1, value2)
    }
  })
}

module.exports = {
  validate,
}