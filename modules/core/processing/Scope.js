
const { processObject, processObjectFilter, processFunctionCall } = require('./utils')
const proto = require('../utils/proto')
const Loadable = require('../modeling/mixins/Loadable')
const mixer = require('../mixer')

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
  throw new Error('Could build path from source')
}

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

  async process(body) {
    console.log({ body })
    if (Array.isArray(body)) {
      const source = await processFunctionCall(this, {
        $and: body
      })
      return source.value
    } else if (typeof body === 'object') {
      const source = await processObjectFilter(this, body)
      return source.value
    }
    console.error(body)
    throw new Error('Could not parse body')
  }

  async processObject(object) {
    return await processObject(this, object)
  }

  load() {

  }

  async onGetProperty(property, value) {
    if (mixer.is(property.type.prototype, Loadable)) {
      const path = getPath(value)
      await this.load(path)
    }
  }
}