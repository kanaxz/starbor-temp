
const { processObject, processObjectFilter, processFunctionCall } = require('./utils')
const proto = require('../../core/shared/utils/proto')

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
    const child = new this.constructor({
      parent: this,
    })
    return child
  }

  async process(body) {
    if (Array.isArray(body)) {
      const source = await processFunctionCall(this, {
        $and: body
      })
      return source.value
    } else if (typeof body === 'object') {
      const source = await processObjectFilter(this, body)
      return source.value
    }
    throw new Error('Could not parse body')
  }

  async processObject(object) {
    return await processObject(this, object)
  }


  async getProperty(property, source) {
    throw new Error('Not implemented')
  }

  onGetProperty(){}
}