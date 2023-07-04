const mixer = require('../../mixer')
const ArrayAssociation = require('./ArrayAssociation')

module.exports = class Branch extends mixer.extends(ArrayAssociation) {
  async innerLoad(context, paths) {
    await this.owner.load(context)
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

  destroy() {
    super.destroy()
    this.resetListeners()
  }
}
  .define({
    name: 'branch',
  })