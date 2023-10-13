const MemoryScope = require('./memory/MemoryScope')

const match = async (context, object, filters) => {
  console.log('match', object, object.constructor)
  if (object.load) {
    await object.load()
  }
  const scope = new MemoryScope({
    context,
  })

  scope.variables = {
    this: {
      sourceType: 'var',
      name: 'this',
      value: object,
      type: object.constructor,
    }
  }

  const match = await scope.process(filters)
  return match
}

module.exports = {
  match
}