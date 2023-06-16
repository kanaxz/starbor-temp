const Loadable = require('../mixins/Loadable')
const mixer = require('../../mixer')
const Array = require('./Array')
const Bindeable = require('../../mixins/Bindeable')

module.exports = class Branch extends mixer.extends(Array, [Loadable, Bindeable]) {
  constructor(owner, property) {
    super()
    /*
      * when using native array functions like map, filter etc, it will return an instance of the current array class, which branch in this case
      * So we add this check to return a native array if the required parameters are not passed
    */
    if (!owner || !property) {
      return []
    }
    this.owner = owner
    this.property = property
    this.listeners = []
  }

  static parse(array, owner, property) {
    let instance = owner[property.name]
    if (!instance) {
      instance = new this(owner, property)
    }

    if (array) {
      console.log({ array })
      instance.splice(0, this.length)
      instance.push(...array)
    }

    return instance
  }

  async innerLoad(paths) {
    await this.owner.load()
    this.update(paths)
  }

  resetListeners() {
    this.listeners.forEach((l) => l.remove())
    this.listeners = []
  }

  async update(paths = true) {
    if (this.updating) {
      console.log(this.owner)
      throw new Error()
    }
    this.updating = true
    console.log('update', this)
    this.resetListeners()
    this.length = 0
    const on = this.property.on
    let current = this.owner
    const name = this.property.name
    while (current) {
      /*
      const listener = current.on(`propertyChanged:${on}`, this.b(this.update))
      this.listeners.push(listener)
      */
      console.log({ current })
      current = current[on]
      if (current) {
        await current.load({
          [name]: paths,
        })
        this.push(current)
      }
    }
    console.log('update finished')
    this.updating = false
  }



  toJSON(paths, context) {
    if (!paths) { return undefined }
    return super.toJSON(paths, context)
  }

  destroy() {
    this.resetListeners()
    super.destroy()
  }
}
  .define({
    name: 'branch',
  })