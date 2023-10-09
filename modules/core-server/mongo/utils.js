const ObjectState = require('core/modeling/states/ObjectState')

const applyStatesValues = (type, states, object) => {
  Object.entries(states).forEach(([propertyName, state]) => {
    const property = type.properties.find((p) => p.name === propertyName)
    if (state.value == null) { return }
    object[propertyName] = state.value
    if (state.states) {
      applyStatesValues(property.type, state.states, object[propertyName])
    }
  })
}

const validate = async (req, type, mode, newObject, oldObject) => {
  const state = new ObjectState({
    value: newObject,
    type,
    required: true,
  })
  state.reset()
  type.controllers.forEach((controller) => {
    const logic = mode === 'create' ? controller.create?.logic : controller.update?.logic
    if (logic) {
      logic(req, state.states, oldObject)
    }
  })

  await state.validate()
  applyStatesValues(type, state.states, newObject)
}

module.exports = {
  validate,
}