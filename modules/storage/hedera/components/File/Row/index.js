const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const StorageObject = require('storage/StorageObject')
require('./style.scss')

module.exports = class FileRow extends Card {
  async update() {
    await super.update()
    if (!this.model) { return }
    this.imgSrc = this.model.path
  }
}
  .define({
    name: 'file-row',
    template,
  })
  .properties({
    imgSrc: 'any',
  })
  .register(StorageObject, 'row')

