const Scope = require('modeling/processing/Scope')
const mixer = require('core/mixer')
const Loadable = require('modeling/mixins/Loadable')
const { Array, Global, Model } = require('modeling/types')

const makePath = (...args) => args.filter((o) => o).join('.')

const getPaths = (source) => {
  if (source.sourceType === 'arg') {
    return getPaths(source.function.source)
  } else if (source.sourceType === 'var') {
    return [source.name]
  } else if (source.sourceType === 'property') {
    const paths = getPaths(source.owner)
    return paths.map((path) => makePath(path, source.name))
  } else if (source.sourceType === 'functionCall') {
    if (source.method === Global.methods.find((m) => m.name === 'if')) {
      return [
        ...getPaths(source.args[1]),
        ...getPaths(source.args[2])
      ]
    } else if (source.method === Array.methods.find((m) => m.name === 'find')) {
      return getPaths(source.args[0].source)
    }
  }


  console.log(source)
  throw new Error('Could build path from source')
  /**/
  return null
}
module.exports = class MongoScope extends Scope {
  constructor(values) {
    super(values)
    if (!this.parent) {
      this.paths = {}
    }
  }

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

  innerGetProperty(property, source) {
    const value = [source.value, property.name].join('.')
    return value
  }

  onGetProperty(property, value) {
    //if (this.parent) { return }
    if (!property.type.hasMixin(Loadable)) {
      return
    }
    if (property.name === '_id' && property.type.prototype instanceof Model) {
      return
    }

    const paths = getPaths(value)

    for (const path of paths) {
      this.root.load(path)
    }
  }
}