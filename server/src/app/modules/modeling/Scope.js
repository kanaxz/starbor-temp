
const { processFunctionCall, processObject, processObjectFilter } = require('./utils')

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
    if (Array.isArray(body)) {
      const and = body.map((functionCall) => {
        const source = processObject(this, functionCall)
        return source.value
      })

      return and
    } else if (typeof body === 'object') {
      const source = processObjectFilter(this, body)
      return source.value
    }
    console.error(body)
    throw new Error('Could not parse body')

  }
  processObject(object) {
    return processObject(this, object)
  }
}