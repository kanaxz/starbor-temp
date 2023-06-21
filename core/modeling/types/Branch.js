const Loadable = require('../mixins/Loadable')
const mixer = require('../../mixer')
const Array = require('./Array')
const Bindeable = require('../../mixins/Bindeable')
const Holdable = require('../../mixins/Holdable')
const Destroyable = require('../../mixins/Destroyable')
const SingleInstance = require('../mixins/SingleInstance')

module.exports = class Branch extends mixer.extends(Array, [Loadable, Bindeable, Holdable]) {
  constructor(owner, property) {
    /*
      * when using native array functions like map, filter etc, it will return an instance of the current array class, which branch in this case
      * So we add this check to return a native array if the required parameters are not passed
    */

    if (!owner || !property) {
      return []
    }
    super()

    this.owner = owner
    this.property = property
    this.listeners = []
  }

  static parse(array, owner, property) {

    let instance = owner[property.name]
    if (array === null) {
      return null
    }

    if (!instance) {
      instance = new this(owner, property)
    }

    if (array) {
      instance.length = 0
      instance.push(...array)
    }

    return instance
  }

  async innerLoad(paths) {
    await this.owner.load()
    await this.update(paths)
  }

  resetListeners() {
    if (this.listeners) {
      this.listeners.forEach((l) => l.remove())
    }
    this.listeners = []
  }

  async update(paths = true) {
    this.resetListeners()
    this.splice(0, this.length)
    const on = this.property.on
    let current = this.owner
    const name = this.property.name
    while (current) {
      /*
      const listener = current.on(`propertyChanged:${on}`, this.b(this.update))
      this.listeners.push(listener)
      */
      current = current[on]
      if (current) {
        await current.load({
          [name]: paths,
        })
        this.push(current)
      }
    }
  }



  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }

  destroy() {
    super.destroy()
    this.resetListeners()
  }
}
  .define({
    name: 'branch',
  })