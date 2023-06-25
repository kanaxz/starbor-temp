const Component = require('../../Component')
const renderer = require('../../renderer')
module.exports = class ReplaceWith extends Component {
  async process(scope) {
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
    this.replaceWith(element);
    element.setAttribute('selectable', '')
    await renderer.render(element, scope)
    return false
  }
}
  .define({
    name: 'replace-with',
  })