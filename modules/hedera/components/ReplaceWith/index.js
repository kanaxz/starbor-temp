const Component = require('../../Component')
const renderer = require('../../renderer')

/**
 * This component cannot be used as a root of a v-for
 */
module.exports = class ReplaceWith extends Component {
  process(scope) {
    const div = document.createElement('div')
    const elementAttribute = this.getAttribute(':element')
    div.setAttribute(':element', elementAttribute)
    renderer.process(div, scope)
    const element = div.element;
    [...this.attributes]
      .forEach((attr) => {
        this.removeAttribute(attr.name)
        element.setAttribute(attr.name, attr.nodeValue)
      })
    this.replaceWith(element)
    element.setAttribute('selectable', '')
    renderer.render(element, scope)
    return false
  }
}
  .define({
    name: 'replace-with',
  })