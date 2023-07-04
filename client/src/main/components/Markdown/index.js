const Component = require('hedera/Component')
const renderer = require('hedera/renderer')
const showdown = require('showdown')
const extensions = require('./extensions')
const service = require('./service')
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

  async initialize() {
    await this.update()
    await super.initialized()
  }

  async update() {
    renderer.destroyContent(this)
    const html = converter.makeHtml(this.value)
    this.innerHTML = html
    const scope = this.scope.child()
    scope.variables.this = service.variables
    await renderer.renderContent(this, scope)
  }
}
  .define({
    name: 'mark-down',
  })
  .properties({
    value: 'any',
  })
