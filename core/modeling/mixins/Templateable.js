const mixer = require('../../mixer')
const ofCache = []

module.exports = mixer.mixin((base) => {
  return class Templateable extends base {
    static of(template) {
      let cache = ofCache.find((c) => c.template === template && c.base == this)
      if (!cache) {
        const c = class extends this { }
        Object.defineProperty(c, 'name', { value: `${this.name}<${template.name}>` })
        c.template = template
        cache = {
          template,
          base: this,
          class: c,
        }
        ofCache.push(cache)
      }

      return cache.class
    }

  }
})