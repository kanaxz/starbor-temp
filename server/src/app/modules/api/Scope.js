
const { processFunctionCall, processObject } = require('./utils')

module.exports = class Scope {
  constructor(values) {
    Object.assign(this, values)
    this.variables = {
      __proto__: (this.parent || {})
    }
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

  child() {
    const child = new Scope({
      parent: this,
    })
    return child
  }

  process(body) {
    const and = []
    for (const functionCall of body) {
      const source = processFunctionCall(this, functionCall)
      and.push(source.value)
    }
    return and
  }
  processObject(object) {
    return processObject(this, object)
  }
}