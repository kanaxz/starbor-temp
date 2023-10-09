const Scope = require('core/processing/Scope')

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

}