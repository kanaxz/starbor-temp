const ObjectState = require('processing/states/ObjectState')

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

const getErrors = (states) => {
  return Object
    .entries(states)
    .map(([k, state]) => {
      const error = {
        property: k,
        errors: state.errors,
      }

      if (state.states) {
        state.properties = getErrors(state.states)
      }
      return error
    })
    .reduce((acc, error) => {
      acc[error.property] = error
      return acc
    }, {})
}

const validate = async (req, type, mode, newObject, oldObject) => {
  const state = new ObjectState({
    value: newObject,
    type,
    required: true,
  })
  for (const controller of type.controllers) {
    const logic = mode === 'create' ? controller.create?.logic : controller.update?.logic
    if (logic) {
      await logic(req, state.states, oldObject)
    }
  }

  await state.validate()
  applyStatesValues(type, state.states, newObject)

  const stateWithError = state.findFirstStateWithError()
  if (!stateWithError) { return }

  const errors = getErrors(state.states)
  const error = new Error('Validator error')
  error.detail = errors
  throw error
}

module.exports = {
  validate,
}