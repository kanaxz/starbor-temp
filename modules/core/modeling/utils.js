const propertySanitizers = []

const getState = (context, property) => {
  return (typeof property.state === 'function') ? property.state(context, property) : property.state || {}
}

module.exports = {
  propertySanitizers,
   getState
}