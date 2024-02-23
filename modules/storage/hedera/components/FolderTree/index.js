const Component = require('hedera/Component')
const template = require('./template.html')
const Folder = require('storage/Folder')
require('./style.scss')

module.exports = class FolderTree extends Component {
  constructor() {
    super()
    this.on('propertyChanged:folder', this.b(this.onFolderChanged))
  }

  async onInit() {
    await this.onFolderChanged()
  }

  select(folder) {
    this.event('selected', { folder })
  }

  async onFolderChanged() {
    this.loading = true
    await this.folder.branch.load({
      children: true
    })
    await this.folder.children.load()
    if (!this.root) {
      this.calculatedRoot = this.folder.branch[this.folder.branch.length - 1]
      if (!this.calculatedRoot) {
        this.calculatedRoot = this.folder
      }
    }
    this.loading = false
  }

}
  .define({
    name: 'folder-tree',
    template,
  })
  .properties({
    folder: 'any',
    root: 'any',
    calculatedRoot: 'any',
    loading: 'any',
  })
  .variables({
    Folder
  })
