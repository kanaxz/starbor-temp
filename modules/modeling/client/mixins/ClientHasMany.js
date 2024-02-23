const mixer = require("core/mixer");


module.exports = mixer.mixin((base) => {
  return class extends base {
    async onModelCreated(model) {
      const { template } = this.constructor.definitions.find((d) => d.template)
      const isInsanceOfTemplate = model instanceof template
      if (!isInsanceOfTemplate) { return }
      if(model[this.property.on] === this.owner){
        this.push(model)
      }
    }
  }
})