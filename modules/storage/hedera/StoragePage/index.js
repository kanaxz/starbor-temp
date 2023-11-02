const template = require('./template.html')
const Component = require('hedera/Component')
const componentsService = require('modeling-hedera/componentsService')
const Loadable = require('modeling/mixins/Loadable')
const Folder = require('storage/Folder')
const mixer = require('core/mixer')
require('./style.scss')


module.exports = class StoragePage extends Component {
  constructor(folder) {
    super()
    this.folder = folder
  }

  async onInit() {
    await this.focusFolder(this.folder)
  }

  async focusFolder(folder) {
    await folder.children.load()
    await folder.branch.load()
    this.currentFolder = folder
    console.log('focused', folder.name, folder.branch)
  }

  async onFileObjectClicked(fileObject) {
    if (fileObject instanceof Folder) {
      await this.focusFolder(fileObject)
    }
  }

  async onKeyUp(event) {
    if (event.key === 'Backspace') {
      const folder = this.currentFolder.folder
      if (!folder) { return }
      await this.focusFolder(folder)
    }
    console.log(event.key)
  }
}
  .define({
    name: 'storage-page',
    template,
  })
  .properties({
    folder: 'any',
    currentFolder: 'any',
  })
  .variables({
    Folder
  })