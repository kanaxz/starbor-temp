const MemoryScope = require('./memory/MemoryScope')

const map = {
  filter: async (scope, filter) => {
    const match = await scope.process(filter)
    return match
  }
}

const match = async (context, object, stages) => {
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

  for (const stage of stages) {
    const stageType = Object.keys(stage)[0]
    const stageMatch = await map[stageType](scope, stage[stageType])
    if (!stageMatch) {
      return false
    }
  }
  return true
}

module.exports = {
  match
}