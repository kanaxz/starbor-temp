const Scope = require('processing/Scope')
const mixer = require('core/mixer')
const Loadable = require('modeling/mixins/Loadable')

const makePath = (...args) => args.filter((o) => o).join('.')

const getPath = (source) => {
  if (source.sourceType === 'arg') {
    return getPath(source.function.source)
  } else if (source.sourceType === 'var') {
    if (source.name !== 'this') {
      throw new Error('Cannot build path from source with type var')
    }
    return null
  } else if (source.sourceType === 'property') {
    let parent = getPath(source.owner)
    return makePath(parent, source.name)
  }
  console.log(source)
  throw new Error('Could build path from source')
}
module.exports = class MongoScope extends Scope {
  load(path) {
    if (this.parent) {
      this.parent.load(path)
      return
    }
    const split = path.split('.')
    let current = this.paths
    for (const segment of split) {
      if (!current[segment]) {
        current[segment] = {}
      }
      current = current[segment]
    }
  }

  getProperty(property, source) {
    const value = [source.value, property.name].join('.')
    return value
  }

  onGetProperty(property, value) {
    if (this.parent) { return }
    if (mixer.is(property.type.prototype, Loadable)) {
      const path = getPath(value)
      this.load(path)
    }
  }

}