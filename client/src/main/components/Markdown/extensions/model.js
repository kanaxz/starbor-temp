const { Model } = require("../../../../../../modules/shared/modeling/types")
const componentsService = require('@app/main/componentsService')
const markdownService = require('../service')
const { parse } = require('../../../../../../modules/shared/utils/json')
const childs = Model
  .getAllChilds()
  .filter((c) => !c.definition.abstract)

const childNames = childs.map((c) => c.definition.name)
const regex = new RegExp(`{% (${childNames.join('|')}) (.*?) %}`, 'g')

module.exports = {
  model: {
    type: 'lang',
    filter(s) {
      return s.replace(regex, (all, typeName, index) => {
        index = index.split(';').reduce((acc, s) => {
          const [k, v] = s.split(':')
          acc[k] = v
          return acc
        }, {})

        const type = childs.find((c) => c.definition.name === typeName)
        const rowComponent = componentsService.get(type, 'row')
        const model = type.parse(index)
        const id = markdownService.register(model)
        return `<a :v-link="this.${id}.@url" class="model">
          <${rowComponent.definition.name} :model="this.${id}">
          </${rowComponent.definition.name}>
        </a>
        `
      })
    }
  }
}
