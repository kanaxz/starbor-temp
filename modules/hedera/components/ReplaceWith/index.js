const Component = require('../../Component')

/**
 * This component cannot be used as a root of a v-for
 */
module.exports = class ReplaceWith extends Component {
  async render(scope) {
    const div = document.createElement('div')
    const elementAttribute = this.getAttribute(':element')
    div.setAttribute(':element', elementAttribute)
    scope.process(div)
    element = div.element;
    [...this.attributes]
      .forEach((attr) => {
        this.removeAttribute(attr.name)
        element.setAttribute(attr.name, attr.nodeValue)
      })
    this.replaceWith(element)
    element.setAttribute('selectable', '')
    element = await scope.render(element)
    this.scope = scope
    return element
  }
}
  .define({
    name: 'replace-with',
  })