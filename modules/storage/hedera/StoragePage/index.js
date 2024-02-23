const template = require('./template.html')
const Component = require('hedera/Component')
const StorageObject = require('storage/StorageObject')
const Array = require('core/types/Array')
const { File, Folder } = require('storage')
const context = require('core-client/context')
const Right = require('ressourcing/Right')
require('./style.scss')

module.exports = class StoragePage extends Component {
  constructor(initialFolder) {
    super()
    this.initialFolder = initialFolder
    this.files = new Array()
  }

  async onInit() {
    await this.focusFolder(this.initialFolder, false)
  }

  focus() {
    this.input.focus()
  }

  async focusFolder(folder, pushState = true) {
    this.loading = true
    await folder.children.load()
    await folder.branch.load({
      children: true,
    })

    this.currentFolder = folder
    this.storageObjects = folder.children
    if (pushState) {
      //history.pushState({}, '', `/explorer${folder.path}`)
    }
    this.loading = false
  }

  async onFileObjectClicked(storageObject) {
    if (storageObject instanceof Folder) {
      await this.focusFolder(storageObject)
    } else {
      this.grid.add(storageObject)
      this.event('selected', { file: storageObject })
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

  async search(value) {
    this.currentFolder = null
    this.storageObjects = await StorageObject.collection.find([{ $match: ['$name', value] }])
  }

  async uploadFile(nativeFile) {
    this.progress = 0
    const onUploadProgress = (event) => {
      this.progress = Math.round((100 * event.loaded) / event.total)
      console.log('progress', this.progress)
    }

    const values = {
      folder: this.currentFolder,
      read: new Right({
        type: 'inherited'
      }),
      edit: new Right({
        type: 'inherited'
      })
    }
    const file = await StorageObject.collection.upload(nativeFile, values, { onUploadProgress })
    this.progress = null
    this.files.push(file)
    this.currentFile = file
  }

  removeFile(file) {
    console.log('files', this.files.length)
    this.files.remove(file)
    if (file === this.currentFile) {
      this.currentFile = this.files[0]
    }
    console.log('files', this.files.length)
  }

  async createFolder() {
    const name = await this.currentFolder.getNewFolderName(context)

    await Folder.collection.create({
      '@type': 'folder',
      folder: this.currentFolder.toJSON(),
      name,
      read: new Right({
        type: 'inherited'
      }),
      add: new Right({
        type: 'inherited'
      }),
      edit: new Right({
        type: 'inherited'
      })
    })
  }
}
  .define({
    name: 'storage-page',
    template,
  })
  .properties({
    folder: 'any',
    currentFolder: 'any',
    storageObjects: 'any',
    currentFile: 'any',
    loading: 'any',
  })
  .variables({
    Folder,
    File
  })