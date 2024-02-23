const Component = require('hedera/Component')
const template = require('./template.html')
const StorageObject = require('storage/StorageObject')
require('./style.scss')


module.exports = class FileSelector extends Component {

  constructor() {
    super()
    this.listen(this, 'focus', this.onFocus)
  }

  onFocus() {
    this.input.focus()
    this.search('')
  }

  async uploadFile(nativeFile) {
    console.log(nativeFile)
    this.progress = 0
    const onUploadProgress = (event) => {
      this.progress = Math.round((100 * event.loaded) / event.total)
      console.log('progress', this.progress)
    }

    const file = await StorageObject.collection.upload(nativeFile, this.type, { onUploadProgress })
    this.progress = null
    this.selectFile(file)
  }

  selectFile(file) {
    this.file = file
    this.event('selected', { file })
  }

  async search(value) {
    if (value === this.lastSearchValue) { return }
    this.lastSearchValue = value
    this.objects = await StorageObject.collection.find([{
      $match: ['$name', value]
    }], {
      type: this.type.definition.name,
    })
  }

}
  .define({
    name: 'file-selector',
    template,
  })
  .properties({
    objects: 'any',
    progress: 'any',
    file: 'any',
  })
