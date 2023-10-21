const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const { FileSystemObject } = require('storage')
require('./style.scss')

module.exports = class FileCard extends Card {
  async update() {
    await super.update()
    if (!this.model) { return }
    this.imgSrc = this.model.path
  }
}
  .define({
    name: 'file-card',
    template,
  })
  .properties({
    imgSrc: 'any',
  })
  .register(FileSystemObject, 'card')

