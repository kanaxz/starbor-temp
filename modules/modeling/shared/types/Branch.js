const mixer = require('core/mixer')
const VirtualArrayAssociation = require('./VirtualArrayAssociation')

module.exports = class Branch extends VirtualArrayAssociation {
  async innerLoad(context, paths) {
    await this.owner.load(context)
    await this.update(context, paths)
  }

  resetListeners() {
    if (this.listeners) {
      this.listeners.forEach((l) => l.remove())
    }
    this.listeners = []
  }

  setPathsState(state, paths, err, fromSelf = false) {
    if (fromSelf) { return }
    //console.warn('branch set state', this, state, paths, fromSelf)
    const { name, on } = this.property
    const parent = this.owner[on]
    if (parent) {
      parent.setState(state, {
        ...paths,
        [name]: paths
      }, err)
    }
  }


  async update(context, paths = true) {
    this.resetListeners()
    const {
      on,
      name
    } = this.property
    let current = this.owner[on]
    if (!current) {
      return
    }

    await current.load({
      ...paths,
      [name]: paths
    })


    this.splice(0, this.length)
    while (current) {
      this.push(current)
      current = current[on]
    }

    this.listeners = this.map((object) => object.on(`propertyChanged:${on}`, async () => {
      await this.update(context, paths)
    }))
  }

  onModelUpdated() {

  }

  destroy() {
    super.destroy()
    this.resetListeners()
  }
}
  .define({
    name: 'branch',
  })