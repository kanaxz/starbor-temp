const mixer = require('../../mixer')
const caches = []

const mixin = mixer.mixin((base) => {
  return class Templateable extends base {
    static getLastTemplate() {
      let type = this
      while (type) {
        const template = type.definition.template
        if (template) {
          return template
        }
        type = type.definition.parent
      }
      return null
    }

    static define(definition) {
      super.define(definition)
      if (definition?.template && !(this.prototype instanceof mixin.Template)) {
        const lastTemplate = this.definition.parent?.getLastTemplate()
        const template = definition.template
        if (mixer.is(template.prototype, mixin.Template)) {
          if (lastTemplate) {
            throw new Error('Invalid template')
          }
        }
        else {
          if (
            !lastTemplate
            || !mixer.is(lastTemplate.prototype, mixin.Template)
            || !mixer.is(template.prototype, lastTemplate.definition.template)
          ) {
            console.log(lastTemplate.name, template.name)
            throw new Error('Invalid template')
          }
        }
      }
      return this
    }

    static of(template) {
      let cache = caches.find((c) => c.template === template && c.base === this)
      if (!cache) {
        const name = `${this.name}<${template.definition.name}>`
        const c = class extends this { }
        Object.defineProperty(c, 'name', { value: name })
        c.define({
          name: c.name,
          template,
        })
        cache = {
          template,
          base: this,
          class: c,
        }
        caches.push(cache)
      }

      return cache.class
    }

  }
})

module.exports = mixin