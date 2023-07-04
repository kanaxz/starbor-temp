
const { processObject, processObjectFilter } = require('./utils')
const proto = require('../utils/proto')

module.exports = class Scope {
  constructor(values) {
    Object.assign(this, values)
    this.variables = {
      __proto__: (this.parent?.variables || {})
    }
    if (!this.parent) {
      this.paths = {}
    }
  }

  get root() {
    return this.parent?.root || this
  }

  getHandlers(type) {
    const typeHandlers = proto.get(type)
      .flatMap((t) => {
        const tHandlers = this.root.handlers.filter((h) => {
          return h.for === t || t.dependencies && t.dependencies?.indexOf(h.for) !== -1
        })
        return tHandlers
      })
    return typeHandlers
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

  onGetProperty(property){

  }
}