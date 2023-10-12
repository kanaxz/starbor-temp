const template = require('./template.html')
const Field = require('@app/fields/Field')
const { validateType } = require('../../../shared/utils/file')

require('./style.scss')

module.exports = class FileField extends Field {

  constructor(...args) {
    super(...args)
    this.on('propertyChanged:value', this.b(this.onValueChanged))
  }

  async onReady() {
    this.onValueChanged()
  }

  async onValueChanged() {
    if (!this.value) { return }
    await this.value.load()
  }

  async onInputChanged() {
    const file = this.input.files[0]
    if (!file) { return }
    await this.upload(file)
    this.input.value = null
  }

  async fileSelected() {
    this.modal.close()
    this.setValue(this.fileSelector.file)
  }

  async onDrop(event) {
    this.hover = false
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) {
      return
    }
    console.log(this.type.accept, file.type)
    if (!validateType(this.type.accept, file.type)) {
      this.message(`File type ${file.type} not accepted`)
      return
    }

    await this.upload(file)
  }

  async onClick() {
    console.log(this.modal)
    this.modal.show()
    this.fileSelector.focus()
  }

  onDragOver(event) {
    event.preventDefault()
  }

  onDragEnter(event) {
    event.preventDefault()
    this.hover = true
  }

  onDragLeave() {
    this.hover = false
  }
}
  .define({
    name: 'file-field',
    template,
  })
  .properties({
    hover: 'any',
    progress: 'any',
  })
