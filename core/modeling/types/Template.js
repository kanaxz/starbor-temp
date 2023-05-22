const Virtual = require("./Virtual")
const Templateable = require('../mixins/Templateable')

class Template extends Virtual {
  static getType(ownerType) {
    if (!ownerType.prototype instanceof this.definition.template) {
      throw new Error('Types not matching')
    }

    const lastTemplate = ownerType.getLastTemplate()
    if (lastTemplate) {
      return lastTemplate
    }
    else {
      //return this.definition.template
    }

  }

}

Template.define({
  name: 'template',
})

Templateable.Template = Template

module.exports = Template
