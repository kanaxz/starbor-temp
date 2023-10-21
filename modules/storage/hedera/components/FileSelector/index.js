const Component = require('hedera/Component')
const template = require('./template.html')
const { FileSystemObject } = require('storage')
const componentsService = require('modeling-hedera/componentsService')
require('./style.scss')


module.exports = class FileSelector extends Component {

  constructor() {
    super()
    this.listen(this, 'focus', this.onFocus)
  }

  template(object) {
    const type = componentsService.get(object.constructor, 'card')
    return new type(object)
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

    const file = await FileSystemObject.collection.upload(nativeFile, this.type, { onUploadProgress })
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
    this.objects = await FileSystemObject.collection.find([{
      $match: ['$name', value]
    }], {
      type: this.type.definition.name,
    })
    console.log('finished search', this.objects)
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
