const State = require('./State')
const { ArrayAssociation, Model, Primitive } = require('../types')
const ModelState = require('./ModelState')
const { getState } = require('../utils')
const ignore = ['_id']

const mapping = [
  [Primitive, State],
  [Model, ModelState],
]

const getStateType = (type) => {
  const pair = mapping.find(([t]) => t === type || type.prototype instanceof t)
  if (!pair) { return null }
  return pair[1]
}

class ObjectState extends State {
  constructor(values) {
    super(values)
    this.updateStates()
  }

  updateStates() {
    this.states = this.type.properties
      .filter((p) => {
        const shouldIgnore = ignore.indexOf(p.name) !== -1
        if (shouldIgnore) { return false }
        if (p.context === false) { return false }
        if (p.type.prototype instanceof ArrayAssociation) { return false }
        return true
      })
      .reduce((acc, property) => {
        const stateType = getStateType(property.type)
        const state = getState({ property: this.property }, property)
        acc[property.name] = new stateType({
          objectState: this,
          property,
          type: property.type,
          ...state,
          root: this.root || this,
        })
        return acc
      }, {})
  }

  reset() {
    super.reset()
    Object.values(this.states).forEach((state) => state.reset())
  }

  async validate() {
    await super.validate()
    for (const state of Object.values(this.states)) {
      await state.validate()
    }
  }

  findFirstStateWithError() {
    for (const state of Object.values(this.states)) {
      if (state.errors.length) { return state }
      if (state.states) {
        const subState = state.findFirstStateWithError()
        if (subState) { return subState }
      }
    }
    return null
  }
}
ObjectState
  .define()

mapping.push([Object, ObjectState])

module.exports = ObjectState