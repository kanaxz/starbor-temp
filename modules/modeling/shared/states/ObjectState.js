const State = require('./State')
const { ArrayAssociation, Model, Primitive } = require('../types')
const ModelState = require('./ModelState')
const ignore = ['_id']

const getState = (context, property) => {
  return (typeof property.state === 'function') ? property.state(context, property) : property.state || {}
}

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
    this.on('propertyChanged:value', this.b(this.onValueChanged))
    this.onValueChanged()
    this.updateStates()
  }

  onValueChanged() {
    if (!this.value) { return }
    this.on(this.value, 'propertyChanged', this.b(this.onChildValueChanged))
  }

  reset() {
    super.reset()

    Object.values(this.states).forEach((s) => {
      s.reset()
      const state = getState({ property: this.property }, s.property)
      Object.assign(s, state)
    })
  }

  async onChildValueChanged(property, value) {
    const state = this.states[property.name]
    if (!state) { return }
    await state.valueChanged()
  }

  updateStates() {
    this.states = this.property.type.properties
      .filter((p) => {
        const shouldIgnore = ignore.indexOf(p.name) !== -1
        if (shouldIgnore) { return false }
        if (p.context === false) { return false }
        if (p.type.prototype instanceof ArrayAssociation) { return false }
        return true
      })
      .reduce((acc, property) => {
        const stateType = getStateType(property.type)
        acc[property.name] = new stateType({
          objectState: this,
          property,
          root: this.root || this,
        })
        return acc
      }, {})
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