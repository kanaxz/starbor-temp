const Component = require('hedera/Component')
const showdown = require('showdown')
const extensions = require('./extensions')
const service = require('./service')
const Scope = require('hedera/Scope')
require('./style.scss')

const converter = new showdown.Converter({
  parseImgDimensions: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true,
  disableForced4SpacesIndentedSublists: true,
  backslashEscapesHTMLTags: true,
  emoji: true,
  metadata: false
})

Object.entries(extensions).map(([k, v]) => converter.addExtension(v, k))


module.exports = class Markdown extends Component {
  constructor() {
    super()
    this.on('propertyChanged:value', this.b(this.update))
  }

  onInit() {
    this.update()
  }

  update() {
    if (this.contentScope) {
      this.contentScope.destroy()
      this.contentScope = null
    }
    if (!this.value) { return }

    const html = converter.makeHtml(this.value)
    this.innerHTML = html
    const scope = this.scope.child()
    scope.variables.this = service.variables
    scope.renderContent(this)
    this.contentScope = scope
  }
}
  .define({
    name: 'mark-down',
  })
  .properties({
    value: 'any',
  })
