const RootModelState = require('modeling/states/RootModelState')

const getErrors = (states) => {
  return Object
    .entries(states)
    .map(([k, state]) => {
      if (!state.errors.length && !state.states) { return null }
      const error = {
        property: k,
      }

      if (state.errors) {
        error.errors = state.errors
      }

      if (state.states) {
        state.properties = getErrors(state.states)
      }
      return error
    })
    .filter((o) => o)
    .reduce((acc, error) => {
      acc[error.property] = error
      return acc
    }, {})
}

const validate = async (req, type, isEdit, value) => {
  const state = new RootModelState({
    context: req,
    value,
    isEdit,
    property: {
      type,
    },
    required: true,
  })
  await state.applyLogics()
  await state.validate()

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