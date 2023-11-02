const Card = require('modeling-hedera/components/Card')
const template = require('./template.html')
const Image = require('storage/Image')
require('./style.scss')

module.exports = class ImageCard extends Card {
  async update() {
    await super.update()
    if (!this.model) { return }
    this.imgSrc = this.model.path
  }
}
  .define({
    name: 'image-card',
    template,
  })
  .properties({
    imgSrc: 'any',
  })
  .register(Image, 'card')

